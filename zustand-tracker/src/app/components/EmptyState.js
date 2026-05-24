export default function EmptyState({ title, description }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-xs">
      <h2 className="text-3xl font-bold mb-6 leading-tight text-[#00ffb3]">
        {title}
      </h2>
      <p className="text-sm leading-relaxed opacity-90 text-[#00ffb3]">
        {description}
      </p>
    </div>
  );
}