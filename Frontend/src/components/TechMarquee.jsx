const technologies = [
  { name: "Python", category: "Programming" },
  { name: "Artificial Intelligence", category: "Core AI" },
  { name: "React.js", category: "Frontend" },
  { name: "JavaScript", category: "Web" },
  { name: "AWS Cloud", category: "Cloud" },
  { name: "Docker & DevOps", category: "DevOps" },
  { name: "Tailwind CSS", category: "UI/UX" },
  { name: "Git & GitHub", category: "Version Control" },
  { name: "OpenAI & ChatGPT", category: "GenAI" },
  { name: "Linux Administration", category: "Systems" },
];

export default function TechMarquee() {
  return (
    <div className="w-full bg-[#0E0D17] border-y border-white/5 py-6 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0A12] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0A12] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max items-center gap-6 animate-marquee">
        {/* Double the list for infinite seamless marquee */}
        {[...technologies, ...technologies].map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            className="flex items-center gap-3 bg-[#15141F] border border-white/10 rounded-full px-5 py-2.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span className="text-sm font-semibold text-[#F8F7FC] whitespace-nowrap">
              {tech.name}
            </span>
            <span className="text-[10px] text-[#A6A3B0] bg-white/5 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
