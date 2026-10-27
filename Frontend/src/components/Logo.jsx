export default function Logo({ className = "h-8 sm:h-9 md:h-10 w-auto" }) {
  return (
    <div className="flex items-center select-none group">
      <img
        src="/logo.png"
        alt="The Master Academy"
        draggable="false"
        fetchPriority="high"
        className={`${className} object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
      />
    </div>
  );
}