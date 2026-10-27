import SpotlightCard from "./SpotlightCard";

const pillars = [
  "Hands-on Learning",
  "Confidence Building",
  "Career Readiness",
  "1-on-1 Mentorship",
  "Live Interactive Zoom Sessions",
  "Lifetime Alumni Support",
];

const features = [
  {
    n: "01",
    title: "Practical Learning",
    copy: "Build functional applications from scratch with guidance on industry best practices and code reviews.",
  },
  {
    n: "02",
    title: "Live Zoom Classes",
    copy: "Interact directly with instructors, ask real-time questions, and get your doubts resolved instantly.",
  },
  {
    n: "03",
    title: "AI Integration",
    copy: "Master cutting-edge AI tools (ChatGPT, Copilot, Canva AI, APIs) to boost your development speed by 10x.",
  },
  {
    n: "04",
    title: "Career Mentoring",
    copy: "Resume reviews, LinkedIn optimization, GitHub portfolio refinement, and mock interview guidance.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20 items-center">
        <div>
          <span className="inline-block text-xs font-bold tracking-[2.5px] text-[#C4B5FD] uppercase mb-3">
            ABOUT US
          </span>
          <h2 className="font-[Manrope] font-extrabold text-2xl sm:text-3xl md:text-[36px] leading-[1.16] text-[#F8F7FC] mb-4 sm:mb-5">
            Empowering Next-Gen Tech Professionals
          </h2>
          <p className="text-[#D5D3DC] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-3.5 sm:mb-4 font-normal">
            Master Academy is a career-focused learning platform designed to help
            students, beginners, and working professionals build real-world, high-demand skills
            that matter in today's tech industry.
          </p>
          <p className="text-[#A6A3B0] text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
            We don't believe in boring theoretical slides. Every single concept is paired with
            live coding, cloud deployment, and portfolio-ready projects — combined with soft skills
            and interview confidence training.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {pillars.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-2 text-xs md:text-sm text-[#D5D3DC] bg-[#15141F] border border-white/10 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 hover:border-[#8B5CF6]/50 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6]" />
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Visual feature box */}
        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <SpotlightCard key={f.n} className="bg-[#15141F] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center text-[#C4B5FD] font-bold text-lg mb-4">
                {f.n}
              </div>
              <h3 className="font-[Manrope] font-bold text-lg text-[#F8F7FC] mb-2">{f.title}</h3>
              <p className="text-xs text-[#A6A3B0] leading-relaxed">{f.copy}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}