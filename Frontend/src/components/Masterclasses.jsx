import SpotlightCard from "./SpotlightCard";

const sessions = [
  {
    tag: "AI & PYTHON",
    title: "AI with Python: Practical Masterclass",
    trainer: "Ashwini",
    trainerImage: `${import.meta.env.BASE_URL}trainer-ashwini.jpg`,
    role: "Senior AI & Python Instructor",
    duration: "2 Hours 30 Minutes",
    image: "/masterclass-python.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=900&auto=format&fit=crop",
    highlights: [
      "Complete Python fundamentals & syntax",
      "Practical usage of AI tools like ChatGPT, Copilot & Canva AI",
      "Two hands-on mini projects built live during the session",
      "Essential soft skills, communication & presentation tips",
    ],
  },
  {
    tag: "WEB DEVELOPMENT",
    title: "Practical Web Development with Real Projects & AI",
    trainer: "Ambreen",
    trainerImage: `${import.meta.env.BASE_URL}trainer-ambreen.jpg`,
    role: "Lead Full-Stack Web Developer",
    duration: "2 Hours 30 Minutes",
    image: "/masterclass-webdev.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=900&auto=format&fit=crop",
    highlights: [
      "Semantic HTML5 fundamentals & robust form handling",
      "Modern CSS layouts — Box Model, Flexbox & CSS Grid",
      "JavaScript DOM interaction and modern ES6 syntax",
      "Real-world project development & AI chatbot integration",
    ],
  },
];

export default function Masterclasses() {
  return (
    <section id="masterclasses" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-12 sm:mb-14">
          <span className="block text-xs font-bold tracking-[2.5px] text-[#C4B5FD] uppercase mb-3">
            PAST WORKSHOPS & REPLAYS
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] break-words">
            Recent Masterclasses
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A6A3B0] mt-3 leading-relaxed">
            Catch a glimpse of how our live, interactive sessions are delivered by industry practitioners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sessions.map((s, idx) => (
            <SpotlightCard
              key={s.title}
              delay={idx * 120}
              className="rounded-2xl bg-[#15141F] border border-white/10 flex flex-col overflow-hidden hover:border-[#8B5CF6]/50 transition-all duration-300 group"
            >
              {/* Media Thumbnail Banner */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#110F1C]">
                <img
                  src={s.image}
                  alt={s.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = s.fallbackImage;
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#15141F] via-[#15141F]/40 to-black/50" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-[11px] font-bold tracking-wide text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] rounded-full px-3.5 py-1 shadow-lg shadow-purple-900/40">
                    {s.tag}
                  </span>
                  <span className="text-xs font-medium text-[#F8F7FC] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    ⏱ {s.duration}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#8B5CF6] transition-all duration-300">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current translate-x-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Trainer Overlay */}
                <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3 z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C4B5FD] flex items-center justify-center font-bold text-white shadow-lg border border-white/20 overflow-hidden shrink-0">
                    {s.trainerImage ? (
                      <img
                        src={s.trainerImage}
                        alt={s.trainer}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      s.trainer[0]
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white drop-shadow-md">{s.trainer}</div>
                    <div className="text-[11px] text-[#C4B5FD] font-medium drop-shadow-md">{s.role}</div>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 sm:p-7 md:p-8 flex flex-col grow">
                <h3 className="font-sans font-bold text-xl text-[#F8F7FC] leading-snug mb-5">
                  {s.title}
                </h3>

                <p className="text-[11px] font-bold tracking-[1.5px] text-[#C4B5FD] uppercase mb-3">
                  SESSION HIGHLIGHTS
                </p>
                <ul className="flex flex-col gap-3 mb-8">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-[#D5D3DC] leading-relaxed">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 mt-0.5 text-[#8B5CF6] fill-none stroke-current stroke-[2.2] shrink-0">
                        <circle cx="12" cy="12" r="9" className="opacity-25" />
                        <path d="M8 12.5l2.5 2.5L16 9.5" />
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#courses"
                  className="mt-auto inline-flex items-center justify-center gap-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:opacity-90 rounded-full px-7 py-3.5 w-full sm:w-fit transition-all duration-300 shadow-[0_4px_16px_rgba(139,92,246,0.3)] text-center"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Join Next Live Cohort
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
