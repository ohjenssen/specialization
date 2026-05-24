import Link from 'next/link';

export default function FoodComponentCard({ food }) {
  const factor = food.gramsEaten / 100;
  const calculatedKcal = Math.round(food.kcal * factor);
  const calculatedProtein = (food.protein * factor).toFixed(1);
  const calculatedFat = (food.fat * factor).toFixed(1);
  const calculatedCarbs = (food.carbs * factor).toFixed(1);

  return (
    <div className="space-y-2 w-full">
      {/* Varenavn og Merke */}
      <h3 className="text-lg font-medium text-[#00ffb3] pl-2">
        {food.name} <span className="opacity-60 text-sm">- {food.brand}</span>
      </h3>

      {/* Kortet */}
      <Link 
        href={`/details/${food.id}`} 
        className="bg-[#00ffb3] text-[#003d2b] rounded-2xl p-4 flex items-center justify-between shadow-lg hover:scale-[1.01] transition-transform block"
      >
        <div className="flex items-center bg-[#003d2b]/10 rounded-xl px-4 py-2 font-bold text-lg min-w-[75px] justify-center">
          {food.gramsEaten}g
        </div>
        
        <div className="flex divide-x divide-[#003d2b]/20 text-center text-[10px] leading-tight font-semibold flex-1 justify-end">
          <div className="px-2.5 min-w-[50px]">{calculatedKcal}<br/>kcal</div>
          <div className="px-2.5 min-w-[50px]">{calculatedProtein} g<br/>Proteins</div>
          <div className="px-2.5 min-w-[50px]">{calculatedFat} g<br/>Fats</div>
          <div className="px-2.5 min-w-[50px]">{calculatedCarbs} g<br/>Carbs</div>
        </div>
      </Link>
    </div>
  );
}