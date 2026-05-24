import { History } from 'lucide-react';
import Link from 'next/link';

export default function SearchItem({ id, name, brand, mealId }) {
  // Hvis vi kom fra et spesifikt måltid, sender vi med mealId videre til detaljsiden
  const href = mealId ? `/details/${id}?mealId=${mealId}` : `/details/${id}`;

  return (
    <Link href={href} className="flex items-center gap-4 group">
      <History className="text-[#00ffb3] opacity-70" size={24} />
      <span className="text-lg group-hover:underline text-[#00ffb3]">
        {name} <span className="opacity-60 text-sm">- {brand}</span>
      </span>
    </Link>
  );
}