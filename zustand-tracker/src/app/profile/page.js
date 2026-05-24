"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';
import UserSettings from '../components/UserSettings';

export default function ProfilePage() {

  // State for å kontrollere om vi er i redigeringsmodus
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="min-h-screen bg-[#003d2b] text-white relative pb-24">
      
      <UserProfile 
        onEdit={() => setIsEditing(true)} 
      />

      {/* Vis redigering som overlay hvis isEditing er true */}
      {isEditing && (
        <UserSettings 
          onClose={() => setIsEditing(false)}
        />
      )}

      <Navbar />
    </main>
  );
}