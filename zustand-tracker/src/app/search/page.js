"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'; // <-- Henter verktøy for å lese URL
import { Search, Sparkles, ScanBarcode, HelpCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import ActionButton from '../components/ActionButton';
import SearchItem from '../components/SearchItem';
import foodData from '../data/foodData.json';

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();

  // Henter ut f.eks. "1" hvis URL er /search?mealId=1
  const mealId = searchParams.get('mealId'); 
  
  const filteredFood = query 
    ? foodData.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const displayList = query ? filteredFood : foodData;

  return (
    <main className="min-h-screen bg-[#003d2b] p-6 pb-40">
      
      {/* Search Input Box */}
      <div className="relative mb-8 mt-4">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search"
          className="w-full bg-white rounded-xl py-3 pl-12 pr-4 text-black focus:outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Results Section */}
      <section>
        <h3 className="text-lg font-medium mb-4 text-[#00ffb3]">
          {query ? "Search results" : "Recent searches"}
        </h3>
        
        <div className="space-y-6">
          {displayList.map((food) => (
            <SearchItem 
              key={food.id} 
              id={food.id} 
              name={food.name} 
              brand={food.brand} 
              mealId={mealId} // <-- Sender med mealId til hvert søke-element!
            />
          ))}
          {query && filteredFood.length === 0 && (
            <p className="text-gray-400 italic">No results found for "{query}"</p>
          )}
        </div>
      </section>

      {/* Action Buttons Row */}
      {/* <div className="fixed bottom-24 left-0 right-0 flex justify-center gap-6 px-6">
        <ActionButton icon={Sparkles} />
        <ActionButton icon={ScanBarcode} />
        <ActionButton icon={HelpCircle} />
      </div> */}

      <Navbar />
    </main>
  );
}