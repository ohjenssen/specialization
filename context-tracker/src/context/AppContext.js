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

  // Her setter vi opp provideren, det som forsyner med data, som i steg 2 av 4.2 seksjonen.
  // Vi sier at vi forsyner alle "children" med user-dataen
  // Dette gjør vi fordi vi bruker nextjs og ikke bare vanlig React
  return (
    <AppContext.Provider value={{ user, setUser }}> 
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

