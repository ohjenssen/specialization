'use client'
import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import CalorieStats from './components/CalorieStats';
import MealCard from './components/MealCard';
import Greeting from './components/Greeting';
import { useApp } from '@/context/AppContext';

export default function CalorieTrackerHome() {
  const { meals } = useApp();
  
  // Kalkuler de totale kaloriene spist på tvers av alle måltider i dag
  const totalCaloriesEatenToday = meals ? meals.reduce((totalSum, meal) => {
    const mealKcal = meal.foodComponents.reduce((mealSum, food) => {
      return mealSum + Math.round(food.kcal * (food.gramsEaten / 100));
    }, 0);
    return totalSum + mealKcal;
  }, 0) : 0;

  return (
    <main className="min-h-screen bg-[#003d2b] text-[#22c55e] p-6 pb-32">
      <Greeting />
      
      <CalorieStats eaten={totalCaloriesEatenToday} />

      <section className="space-y-4">
        {meals && meals.length > 0 ? (
          meals.map(meal => (
            <MealCard key={meal.id} {...meal} />
          ))
        ) : (
          <p className="text-center text-gray-400 italic mt-10">You have not added any meals yet.</p>
        )}
      </section>

      <div className="flex justify-center mt-12">
        {/* 'new' for å signalisere at et nytt måltid skal opprettes */}
        <Link href="/search?mealId=new" className="bg-yellow-400 text-[#003d2b] p-4 rounded-full shadow-2xl">
          <Plus size={32} strokeWidth={3} />
        </Link>
      </div>

      <Navbar />
    </main>
  );
}