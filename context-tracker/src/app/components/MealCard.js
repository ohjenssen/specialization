import Link from "next/link";

export default function MealCard({ id, name, foodComponents = [] }) {
  // Kalkuler totaler for dette spesifikke måltidet dynamisk
  const totals = foodComponents.reduce((acc, food) => {
    const factor = food.gramsEaten / 100;
    return {
      kcal: acc.kcal + Math.round(food.kcal * factor),
      protein: acc.protein + parseFloat((food.protein * factor).toFixed(1)),
      fat: acc.fat + parseFloat((food.fat * factor).toFixed(1)),
      carbs: acc.carbs + parseFloat((food.carbs * factor).toFixed(1)),
    };
  }, { kcal: 0, protein: 0, fat: 0, carbs: 0 });

  // Viser måtlidet i et kort. Linken tar brukeren til et detaljert view.
return (
  <Link href={`/meal/${id}`} className="block transition-transform hover:scale-[1.01]">
    <div className="bg-[#00ffb3] text-[#003d2b] rounded-2xl p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🍴</span>
        <span className="font-bold text-lg leading-none">{name}</span>
      </div>
      <div className="flex divide-x divide-[#003d2b]/20 text-center text-[10px] leading-tight font-semibold">
        <div className="px-2 min-w-[40px]">{totals.kcal}<br/>kcal</div>
        <div className="px-2 min-w-[40px]">{Number(totals.protein).toFixed(1)}g<br/>Prot</div>
        <div className="px-2 min-w-[40px]">{Number(totals.fat).toFixed(1)}g<br/>Fat</div>
        <div className="px-2 min-w-[40px]">{Number(totals.carbs).toFixed(1)}g<br/>Carbs</div>
      </div>
    </div>
  </Link>
);
}