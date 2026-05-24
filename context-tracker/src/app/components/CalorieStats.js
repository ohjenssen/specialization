import { useApp } from "@/context/AppContext";

export default function CalorieStats({ eaten }) {
  // Beregner og viser  hvor mannge kalorier det er spist. Viser en 'progress-bar' 
  const appData = useApp();
  const { user } = appData;
  const progressPercent = Math.min((eaten / user.dailyCalories) * 100, 100);

  return (
    <section className="mt-8 mb-8">
      <h2 className="text-xl font-medium mb-1 text-[#00ffb3]">Eaten</h2>
      <div className="text-2xl font-bold mb-4 text-white">
        {eaten} / <span className="text-gray-300 text-lg font-normal">{user.dailyCalories} kcal</span>
      </div>
      <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-yellow-400 transition-all duration-500" 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </section>
  );
}