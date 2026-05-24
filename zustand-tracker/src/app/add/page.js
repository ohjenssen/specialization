import React from 'react';
import { Search, ScanBarcode, Sparkles, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import ActionButton from '../components/ActionButton';
import EmptyState from '../components/EmptyState';

export default function AddMealPage() {
  return (
    <main className="min-h-screen bg-[#003d2b] font-sans p-8 flex flex-col items-center relative">
      
      <header className="mt-4">
        <h1 className="text-xl font-bold text-[#00ffb3]">Meal 3</h1>
      </header>

      <EmptyState 
        title="Nothing has been added yet."
        description="Select one of the options below to add a component. You can choose a meal you have pre-saved, scan the barcode, search in our database or have AI scan your food."
      />

      {/* Action Icons Row */}
      <section className="flex gap-6 mb-20">
        <ActionButton icon={Sparkles} />
        
        <Link href="/search">
          <ActionButton icon={Search} />
        </Link>
        
        <ActionButton icon={ScanBarcode} />
        <ActionButton icon={HelpCircle} />
      </section>

      <Navbar />
    </main>
  );
}