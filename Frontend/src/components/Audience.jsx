import SpotlightCard from "./SpotlightCard";

const audience = [
  {
    title: "Absolute Beginners",
    desc: "Start from scratch with zero coding anxiety. Learn step-by-step with patient mentors.",
  },
  {
    title: "College Students",
    desc: "Bridge the gap between academic theory and industry reality with real portfolio projects.",
  },
  {
    title: "Career Switchers",
    desc: "Pivot smoothly into software engineering, web development, or cloud computing.",
  },
  {
    title: "Job Seekers",
    desc: "Stand out in competitive interviews with verified GitHub code and confident communication.",
  },
  {
    title: "Working Professionals",
    desc: "Upskill rapidly in AI tools, Python automation, and AWS DevOps to unlock higher pay.",
  },
  {
    title: "Entrepreneurs & Freelancers",
    desc: "Build MVPs, automate business workflows, and ship web applications independently.",
  },
];

export default function Audience() {
  return (
    <section className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-12 sm:mb-14">
          <span className="block text-xs font-bold tracking-[2.5px] text-[#C4B5FD] uppercase mb-3">
            WHO THIS IS FOR
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] break-words">
            Is Master Academy Right For You?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A6A3B0] mt-3 leading-relaxed">
            Whether you have never written a line of code or want to master modern AI & cloud systems, we have a structured path for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {audience.map((a) => (
            <SpotlightCard
              key={a.title}
              className="bg-[#15141F] border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center shrink-0 text-[#C4B5FD]">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.2]">
                    <circle cx="12" cy="12" r="9" className="opacity-25" />
                    <path d="M8 12.5l2.5 2.5L16 9.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#F8F7FC] mb-2">{a.title}</h3>
                  <p className="text-xs sm:text-sm text-[#A6A3B0] leading-relaxed">{a.desc}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
