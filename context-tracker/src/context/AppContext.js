"use client"; 
import { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: "Oskar Heming Jenssen",
    email: "oskar_jenssen@hotmail.com",
    age: 29,
    dailyCalories: 2500
  });

  const [meals, setMeals] = useState([
    { id: 1, name: "Meal 1", foodComponents: [
      { "id": "1", "name": "Havregryn", "brand": "Coop", "kcal": 363, "protein": 13, "fat": 6.5, "carbs": 58, "gramsEaten": 100 },
      { "id": "3", "name": "Skummetmelk", "brand": "Coop", "kcal": 33, "protein": 3.4, "fat": 0.1, "carbs": 4.7, "gramsEaten": 200 },
    ] },
    { id: 2, name: "Meal 2", foodComponents: [
      { "id": "1", "name": "Havregryn", "brand": "Coop", "kcal": 363, "protein": 13, "fat": 6.5, "carbs": 58, "gramsEaten": 100 }
    ] },
  ]);

  const addFoodToMeal = (mealId, foodComponent) => {
    setMeals(prevMeals => 
      prevMeals.map(meal => {
        if (meal.id === parseInt(mealId)) {
          
          // Regn ut nøyaktige verdier for denne spesifikke matvaren basert på gram spist
          const factor = foodComponent.gramsEaten / 100;
          
          const calculatedComponent = {
            id: foodComponent.id,
            name: foodComponent.name,
            brand: foodComponent.brand,
            gramsEaten: foodComponent.gramsEaten,
            // Runder av til nærmeste heltall for kalorier
            kcal: Math.round(foodComponent.kcal * factor),
            // Runder av til nøyaktig 1 desimal for makroer (hindrer 31.200000000003)
            protein: Math.round((foodComponent.protein * factor) * 10) / 10,
            fat: Math.round((foodComponent.fat * factor) * 10) / 10,
            carbs: Math.round((foodComponent.carbs * factor) * 10) / 10,
          };

          return {
            ...meal,
            foodComponents: [...meal.foodComponents, calculatedComponent]
          };
        }
        return meal;
      })
    );
  };

  const createNewMeal = (foodComponent, onSuccess) => {
    // 1. Vi regner ut neste ID med en gang (før setMeals) så vi har den klar
    let nextId = 1;
    
    setMeals(prevMeals => {
      nextId = prevMeals.length > 0 ? Math.max(...prevMeals.map(m => m.id)) + 1 : 1;
      
      const factor = foodComponent.gramsEaten / 100;
      const calculatedComponent = {
        id: foodComponent.id,
        name: foodComponent.name,
        brand: foodComponent.brand,
        gramsEaten: foodComponent.gramsEaten,
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

      return [...prevMeals, newMeal];
    });

    if (onSuccess) {
      setTimeout(() => {
        onSuccess(nextId);
      }, 0);
    }
  };

  // Her setter vi opp provideren, det som forsyner med data, som i steg 2 av 4.2 seksjonen.
  // Vi sier at vi forsyner alle "children" med user-dataen
  // Dette gjør vi fordi vi bruker nextjs og ikke bare vanlig React
  return (
    <AppContext.Provider value={{ user, setUser, meals, setMeals, addFoodToMeal, createNewMeal }}> 
      {children}
    </AppContext.Provider>
  );
}

// Her har jeg lagd et custom hook i samme fil for å bruke konteksten,
// sånn at man bare kan importere den i en annen fil og
// dekonstruere "user" ut av den
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp må brukes innenfor en AppProvider");
  }
  return context;
}
