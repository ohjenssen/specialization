'use client'
import { useUser } from "../store/store"

export default function Greeting(){
  const userName = useUser((state) => state.name)
  return (
    <div>
      <h2>Hello {userName}!</h2>
    </div>
  )
}


