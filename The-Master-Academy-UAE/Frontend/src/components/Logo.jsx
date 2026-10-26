export default function Logo({ className = "h-8 sm:h-9 md:h-10 w-auto" }) {
  const base = import.meta.env.BASE_URL || "/";
  return (
    <div className="flex items-center select-none group">
      <img
        src={`${base}logo.png`}
        alt="ذا ماستر أكاديمي الإمارات"
        draggable="false"
        fetchPriority="high"
        className={`${className} object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
      />
    </div>
  );
}