import { useUser } from '../store/store';

export default function UserSettings({ onClose }) {
  const userName = useUser((state) => state.name)
  const setName = useUser((state) => state.setName)
  
  const email = useUser((state) => state.email)
  const setEmail = useUser((state) => state.setEmail)
  
  const age = useUser((state) => state.age)
  const setAge = useUser((state) => state.setAge)
  
  const dailyCalories = useUser((state) => state.dailyCalories)
  const setCalories = useUser((state) => state.setCalories)

  // handleSave tar imot eventet fra form-submission
  const handleSave = (e) => {
    // Vi sørger for at vi henter ut verdiene fra input-feltene
    e.preventDefault();
    const form = e.currentTarget; 
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries()); 
    console.log(formJson);
    
    // Vi bruker funksjonene fra Zustand til å sette nye verdier 
    setName(formJson.name)
    setEmail(formJson.email)
    setAge(formJson.age)
    onClose();
  };

  const inputClass = "w-full bg-transparent border-b border-[#003d2b] py-2 text-[#003d2b] font-medium focus:outline-none focus:border-[#003d2b]/60";
  const labelClass = "text-xs font-bold text-[#003d2b] mt-6 block";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={onClose}>
      
      <form 
        onSubmit={handleSave} 
        className="bg-[#00ffb3] rounded-3xl w-full max-w-sm p-8 shadow-2xl relative" 
        onClick={(e) => e.stopPropagation()}
      >
        
        <h2 className="text-xl font-bold text-[#003d2b] mb-2 hidden">Edit Profile</h2>

        <div>
          <label className={labelClass}>Name</label>
          <input type="text" name="name" defaultValue={userName} className={inputClass} />

          <label className={labelClass}>Email</label>
          <input type="email" name="email" defaultValue={email} className={inputClass} />

          <label className={labelClass}>Age</label>
          <input type="number" name="age" defaultValue={age} className={inputClass} />

          <label className={labelClass}>Daily calories</label>
          <input type="number" name="dailyCalories" value={dailyCalories} onChange={(e) => setCalories(e.target.value)} className={inputClass} />
        </div>

        <button type="submit" className="mt-8 w-full bg-[#003d2b] text-[#00ffb3] py-3 rounded-xl font-bold">Save Changes</button>
      </form>
    </div>
  );
}