const technologies = [
  { name: "Python", category: "لغات البرمجة" },
  { name: "Artificial Intelligence", category: "الذكاء الاصطناعي" },
  { name: "React.js", category: "تطوير الواجهات" },
  { name: "JavaScript (ES6+)", category: "تطوير الويب" },
  { name: "AWS Cloud", category: "الحوسبة السحابية" },
  { name: "Docker & CI/CD", category: "DevOps والحاويات" },
  { name: "Tailwind CSS", category: "تصميم الواجهات UI" },
  { name: "Git & GitHub", category: "إدارة المشاريع" },
  { name: "OpenAI & LLMs", category: "الذكاء التوليدي" },
  { name: "Linux Administration", category: "أنظمة الخوادم" },
];

export default function TechMarquee() {
  return (
    <div className="w-full bg-[#0E0D17] border-y border-white/5 py-6 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0A12] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0A12] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max items-center gap-6 animate-marquee">
        {[...technologies, ...technologies].map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            className="flex items-center gap-3 bg-[#15141F] border border-white/10 rounded-full px-5 py-2.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span className="text-sm font-bold text-[#F8F7FC] whitespace-nowrap">
              {tech.name}
            </span>
            <span className="text-[10px] text-[#C4B5FD] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2 py-0.5 rounded-full font-medium">
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
