'use client'
import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import CalorieStats from './components/CalorieStats';
import MealCard from './components/MealCard';
import Greeting from './components/Greeting';
import { useMealsStore } from './store/store';

export default function CalorieTrackerHome() {

  // Foreløpig hardkodet, men snart hentet fra Context!
  const dummyMeals = [
    { id: 1, name: "Meal 1", kcal: 511, protein: 46, fat: 7.2, carbs: 60.6 },
    { id: 2, name: "Meal 2", kcal: 180, protein: 33, fat: 0.6, carbs: 10.6 }
  ];

  const meals = useMealsStore((state) => state.meals);

  return (
    <main className="min-h-screen bg-[#003d2b] text-[#22c55e] p-6 pb-32">

      <Greeting />
      
      <CalorieStats eaten={691} goal={2000} />


      <section className="space-y-4">
        {meals.map(meal => (
          <MealCard key={meal.id} {...meal} />
        ))}
      </section>

      <div className="flex justify-center mt-12">
        <Link href="/search?mealId=new" className="bg-yellow-400 text-[#003d2b] p-4 rounded-full shadow-2xl">
          <Plus size={32} strokeWidth={3} />
        </Link>
      </div>

      <Navbar />
    </main>
  );
}