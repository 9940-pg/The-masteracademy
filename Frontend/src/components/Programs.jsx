import SpotlightCard from "./SpotlightCard";

const areas = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C4B5FD] fill-none stroke-current stroke-2">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    title: "Programming & AI",
    copy: "Learn in-demand technologies like Python, AI fundamentals, Full-Stack Web Development, and modern cloud deployment through simple, hands-on projects.",
    topics: ["Python Fundamentals", "Modern JavaScript", "AI APIs & Tooling", "Database & Backend"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C4B5FD] fill-none stroke-current stroke-2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "Communication Skills",
    copy: "Master professional articulation, pitch your projects with clarity, and communicate effectively with global clients and engineering teams.",
    topics: ["Client Interaction", "Tech Demos", "Email Etiquette", "Workplace English"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C4B5FD] fill-none stroke-current stroke-2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Confidence Building",
    copy: "Overcome fear and imposter syndrome. Build rock-solid self-belief to ace technical interviews, coding challenges, and leadership opportunities.",
    topics: ["Public Speaking", "Interview Mindset", "Answering Tough Questions", "Self-Advocacy"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C4B5FD] fill-none stroke-current stroke-2">
        <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    title: "Career Readiness",
    copy: "Get personal guidance on tailoring your resume, building an impressive GitHub portfolio, and optimizing your LinkedIn profile to attract recruiters.",
    topics: ["GitHub Portfolio", "Resume Polishing", "Mock Interviews", "Salary Negotiation"],
  },
];

export default function Programs() {
  return (
    <section id="programs" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-12 sm:mb-14">
          <span className="block text-xs font-bold tracking-[2.5px] text-[#C4B5FD] uppercase mb-3">
            WHAT WE TEACH
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] break-words">
            Our Core Training Pillars
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A6A3B0] mt-3 sm:mt-4 leading-relaxed">
            A comprehensive curriculum tailored to transform learners into confident, employable professionals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {areas.map((a) => (
            <SpotlightCard
              key={a.title}
              className="rounded-2xl bg-[#15141F] border border-white/10 p-5 sm:p-7 flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  {a.icon}
                </div>
                <h3 className="text-[#F8F7FC] text-xl font-sans font-bold mb-3">{a.title}</h3>
                <p className="text-[#A6A3B0] text-sm leading-relaxed mb-6">{a.copy}</p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="text-[11px] font-semibold text-[#C4B5FD] uppercase tracking-wider mb-2">Key Focus:</div>
                <div className="flex flex-wrap gap-1.5">
                  {a.topics.map((t) => (
                    <span key={t} className="text-[11px] text-[#D5D3DC] bg-white/[0.04] px-2.5 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
