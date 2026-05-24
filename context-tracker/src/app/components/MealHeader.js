import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function MealHeader({ name }) {
  // Viser hvilket måltid man er inne på og gir mulighet for å gå til hjemmesiden.
  return (
    <header className="flex items-center justify-between mt-4 mb-10 w-full relative">
      <Link href="/" className="text-[#00ffb3] hover:scale-110 transition-transform z-10">
        <ChevronLeft size={32} />
      </Link>
      <h1 className="text-xl font-bold text-[#00ffb3] absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
        {name}
      </h1>
      <div className="w-8"></div>
    </header>
  );
}