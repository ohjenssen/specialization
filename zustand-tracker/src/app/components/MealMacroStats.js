export default function MealMacroStats({ totals }) {
  // Viser totalt antall kalorier og makronæringsstoffer
  return (
    <>
      <section className="text-center mb-12">
        <h2 className="text-lg text-[#00ffb3] font-medium opacity-90 mb-1">Total calories</h2>
        <p className="text-4xl font-bold text-[#00ffb3]">{totals.kcal} kcal</p>
      </section>

      <section className="grid grid-cols-3 text-center gap-4 mb-14 px-4 w-full">
        <div>
          {/* NYTT: Formaterer til én desimal under visning */}
          <p className="text-xl font-bold text-[#00ffb3]">{Number(totals.protein).toFixed(1)}g</p>
          <p className="text-xs text-[#00ffb3] opacity-70">Proteins</p>
        </div>
        <div>
          <p className="text-xl font-bold text-[#00ffb3]">{Number(totals.fat).toFixed(1)}g</p>
          <p className="text-xs text-[#00ffb3] opacity-70">Fats</p>
        </div>
        <div>
          <p className="text-xl font-bold text-[#00ffb3]">{Number(totals.carbs).toFixed(1)}g</p>
          <p className="text-xs text-[#00ffb3] opacity-70">Carbohydrates</p>
        </div>
      </section>
    </>
  );
}