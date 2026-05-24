import { useApp } from "@/context/AppContext";

export default function Greeting(){
  const appData = useApp(); // Her så "Invoker" vi useApp funksjon
  const { user } = appData; // Her dekonsturerer vi "user" fra appData sånn at vi kan bruke den overalt.

  return (
    <div>
      <h2>Hello {user.name}!</h2>
    </div>
  )
}


