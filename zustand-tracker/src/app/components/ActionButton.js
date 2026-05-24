export default function ActionButton({ icon: Icon, onClick, color = "bg-[#00ffb3]" }) {
  return (
    <button 
      onClick={onClick}
      className={`${color} text-[#003d2b] p-4 rounded-full shadow-lg hover:scale-110 transition-transform`}
    >
      <Icon size={32} />
    </button>
  );
}