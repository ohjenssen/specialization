"use client";
import React, { useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import foodData from '@/data/foodData.json';
import Navbar from '@/app/components/Navbar';

export default function MealComponentDetailsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const { addFoodToMeal, createNewMeal } = useApp();

  // Henter ut måltidet fra url
  const mealId = searchParams.get('mealId');

  // Finner matvaren med riktig id - Default verdi er habregryn
  const baseFood = foodData.find(f => f.id === id) || {
    id: "1", name: "Havregryn", brand: "Coop", kcal: 363, protein: 13, fat: 6.5, carbs: 58
  };

  const [grams, setGrams] = useState(100);

// Kalkuler næringsverdier basert på input (verdi * gram / 100)
  const factor = grams / 100;
  const calculatedKcal = Math.round(baseFood.kcal * factor) || 0;

  // NY FIKS: Garanterer maks én desimal og tvinger det til å være et rent tall
  const calculatedProtein = Math.round((baseFood.protein * factor) * 10) / 10 || 0;
  const calculatedFat = Math.round((baseFood.fat * factor) * 10) / 10 || 0;
  const calculatedCarbs = Math.round((baseFood.carbs * factor) * 10) / 10 || 0;

  const handleSave = () => {
    // Forbered rådata-objektet for matvaren
    const foodComponentData = {
      id: baseFood.id,
      name: baseFood.name,
      brand: baseFood.brand,
      kcal: baseFood.kcal,
      protein: baseFood.protein,
      fat: baseFood.fat,
      carbs: baseFood.carbs,
      gramsEaten: parseInt(grams) || 0
    };

    if (mealId === 'new') {
      // Opprett nytt måltid og send brukeren DIREKTE til det nye måltidet
      createNewMeal(foodComponentData, (newMealId) => {
        router.push(`/meal/${newMealId}`);
      });
    } else if (mealId) {
      // Brukeren trykket pluss inni et måltid -> Oppdater eksisterende!
      addFoodToMeal(mealId, foodComponentData);
      router.push(`/meal/${mealId}`);
    } else {
      router.push('/');
    }
  };

  const rowClass = "flex justify-between border-b border-white/20 py-4 text-lg";

  return (
    <main className="min-h-screen bg-[#003d2b] text-white p-6 pb-32 flex flex-col font-sans">
      
      <header className="mt-4 mb-12">
        <button onClick={() => router.back()} className="text-[#00ffb3] hover:scale-110 transition-transform">
          <ChevronLeft size={32} />
        </button>
      </header>

      <h1 className="text-3xl font-bold text-center text-[#00ffb3] mb-16 mt-4">
        {baseFood.name}
      </h1>

      <div className="space-y-2 flex-1 px-2">
        <div className={rowClass}>
          <span className="opacity-90">Kcal</span>
          <span className="font-semibold">{calculatedKcal}</span>
        </div>
        <div className={rowClass}>
          <span className="opacity-90">Proteins</span>
          <span className="font-semibold">{calculatedProtein} g</span>
        </div>
        <div className={rowClass}>
          <span className="opacity-90">Fats</span>
          <span className="font-semibold">{calculatedFat} g</span>
        </div>
        <div className={rowClass}>
          <span className="opacity-90">Carbohydrates</span>
          <span className="font-semibold">{calculatedCarbs} g</span>
        </div>
      </div>

      <div className="space-y-6 mt-auto px-2">
        <div className="bg-white rounded-xl p-4 flex items-center justify-end shadow-lg text-black">
          <input 
            type="number" 
            value={grams} 
            onChange={(e) => setGrams(e.target.value)} 
            className="w-full text-right bg-transparent text-2xl font-medium focus:outline-none pr-2 text-[#003d2b]"
          />
          <span className="text-2xl text-gray-400 font-medium">g</span>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-yellow-400 text-[#003d2b] font-bold py-4 rounded-xl text-xl shadow-xl hover:bg-yellow-300 transition-colors"
        >
          Save
        </button>
      </div>

      <Navbar/>

    </main>
  );
}