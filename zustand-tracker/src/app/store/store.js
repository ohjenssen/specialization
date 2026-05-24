import { create } from 'zustand'

export const useMealsStore = create((set, get) => ({
  // Her har jeg lagd en starttilstand for måltider, 
  // dette er sånn at det ikke skal være tomt når man kommer inn på applikasjonen.
  meals: [
    { id: 1, name: "Meal 1", foodComponents: [
      { id: "1", name: "Havregryn", brand: "Coop", kcal: 363, protein: 13, fat: 6.5, carbs: 58, gramsEaten: 100 },
      { id: "3", name: "Skummetmelk", brand: "Coop", kcal: 33, protein: 3.4, fat: 0.1, carbs: 4.7, gramsEaten: 200 },
    ] },
    { id: 2, name: "Meal 2", foodComponents: [
      { id: "1", name: "Havregryn", brand: "Coop", kcal: 363, protein: 13, fat: 6.5, carbs: 58, gramsEaten: 100 }
    ] },
  ],

  // Legg til mat i eksisterende måltid
  addFoodToMeal: (mealId, foodComponent) => set((state) => {
    const factor = foodComponent.gramsEaten / 100;
    
    const calculatedComponent = {
      ...foodComponent,
      kcal: Math.round(foodComponent.kcal * factor),
      protein: Math.round((foodComponent.protein * factor) * 10) / 10,
      fat: Math.round((foodComponent.fat * factor) * 10) / 10,
      carbs: Math.round((foodComponent.carbs * factor) * 10) / 10,
    };

    return {
      meals: state.meals.map((meal) => 
        meal.id === parseInt(mealId)
          ? { ...meal, foodComponents: [...meal.foodComponents, calculatedComponent] }
          : meal
      )
    };
  }),

  // Opprett et helt nytt måltid
  createNewMeal: (foodComponent) => {
    const state = get(); // Henter nåværende tilstand inni funksjonen
    const nextId = state.meals.length > 0 ? Math.max(...state.meals.map(m => m.id)) + 1 : 1;
    
    const factor = foodComponent.gramsEaten / 100;
    const calculatedComponent = {
      ...foodComponent,
      kcal: Math.round(foodComponent.kcal * factor),
      protein: Math.round((foodComponent.protein * factor) * 10) / 10,
      fat: Math.round((foodComponent.fat * factor) * 10) / 10,
      carbs: Math.round((foodComponent.carbs * factor) * 10) / 10,
    };

    const newMeal = {
      id: nextId,
      name: `Meal ${nextId}`,
      foodComponents: [calculatedComponent]
    };

    // Oppdaterer staten
    set({ meals: [...state.meals, newMeal] });

    // Returnerer den nye ID-en synkront til komponenten som kalte den!
    return nextId;
  }
}));

export const useUser = create((set) => ({
  name: 'Connor Kenway',
  setName: (newValue) => set({name: newValue}),
  email: 'connor.kenway@gmail.com',
  setEmail: (newValue) => set({email: newValue}),
  age: 34,
  setAge: (newValue) => set({age: newValue}),
  dailyCalories: 2200,
  setCalories: (newValue) => set({dailyCalories: newValue}),
}))