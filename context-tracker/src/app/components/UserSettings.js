import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function UserSettings({ currentData, onClose, onSave }) {
  const appData = useApp();
  const { user, setUser } = appData;

  // Lokal state for skjemaet
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [calories, setCalories] = useState(user.dailyCalories);

  const handleSave = () => {
    setUser({ name, email, age: parseInt(age), dailyCalories: parseInt(calories) });
    onClose();
  };

  // Input felt-stil
  const inputClass = "w-full bg-transparent border-b border-[#003d2b] py-2 text-[#003d2b] font-medium focus:outline-none focus:border-[#003d2b]/60";
  const labelClass = "text-xs font-bold text-[#003d2b] mt-6 block";

  return (
    // Backdrop - klikk for å lukke/lagre
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={handleSave}>
      
      {/* Modal Content - stopPropagation hindrer closing når man klikker inni */}
      <div className="bg-[#00ffb3] rounded-3xl w-full max-w-sm p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        
        <h2 className="text-xl font-bold text-[#003d2b] mb-2 hidden">Edit Profile</h2>

        <div>
          <label className={labelClass}>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />

          <label className={labelClass}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />

          <label className={labelClass}>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} />

          <label className={labelClass}>Daily calories</label>
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className={inputClass} />
        </div>

        <button onClick={handleSave} className="mt-8 w-full bg-[#003d2b] text-[#00ffb3] py-3 rounded-xl font-bold">Save Changes</button>
      </div>
    </div>
  );
}