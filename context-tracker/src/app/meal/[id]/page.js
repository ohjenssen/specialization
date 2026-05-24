"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import FoodComponentCard from '@/app/components/FoodComponentCard';
import Navbar from '@/app/components/Navbar';
import MealHeader from '@/app/components/MealHeader';
import MealMacroStats from '@/app/components/MealMacroStats';
import { Plus } from 'lucide-react'; // <-- Importer pluss-ikonet
import Link from 'next/link';

export default function MealOverviewPage() {
  const { id } = useParams();
  const { meals } = useApp();

  const currentMeal = meals.find(m => m.id === parseInt(id)) || meals[0];

  const totals = currentMeal.foodComponents.reduce((acc, food) => {
    const factor = food.gramsEaten / 100;
    return {
      kcal: acc.kcal + Math.round(food.kcal * factor),
      protein: acc.protein + parseFloat((food.protein * factor).toFixed(1)),
      fat: acc.fat + parseFloat((food.fat * factor).toFixed(1)),
      carbs: acc.carbs + parseFloat((food.carbs * factor).toFixed(1)),
    };
  }, { kcal: 0, protein: 0, fat: 0, carbs: 0 });

  return (
    <main className="min-h-screen bg-[#003d2b] text-white p-6 pb-32 flex flex-col font-sans items-center">
      
      <MealHeader name={currentMeal.name} />

      <MealMacroStats totals={totals} />

      {/* Liste over matkomponenter */}
      <section className="space-y-6 w-full flex-1">
        {currentMeal.foodComponents.map((food, index) => (
          <FoodComponentCard key={food.id || index} food={food} />
        ))}
        
        {/* DEN GULE PLUSS-KNAPPEN FRA BILDET */}
        <div className="flex justify-center mt-6">
          <Link 
            href={`/search?mealId=${currentMeal.id}`} 
            className="bg-yellow-400 text-[#003d2b] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            <Plus size={32} strokeWidth={3} />
          </Link>
        </div>
      </section>

      <Navbar />
    </main>
  );
}