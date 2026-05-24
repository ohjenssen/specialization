import { Home, User } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#003d2b] border-t border-white/10 p-4 flex justify-around items-center z-50">
      <Link href="/" className="text-white opacity-90">
        <Home size={28} />
      </Link>
      <Link href="/profile" className="text-white opacity-90">
        <User size={28} />
      </Link>
    </nav>
  );
}