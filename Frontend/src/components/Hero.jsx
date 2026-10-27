const chips = [
  {
    label: "Python",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#38BDF8] fill-none stroke-current stroke-[2]">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    badge: "Core",
    className: "top-[10%] left-4 2xl:left-10",
    duration: "4.5s",
    delay: "0s",
    glow: "shadow-[0_0_15px_rgba(56,189,248,0.2)]",
  },
  {
    label: "AI & ML",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#C084FC] fill-none stroke-current stroke-[2]">
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.17-6.83l-2.83 2.83m-8 8l-2.83 2.83m0-13.66l2.83 2.83m8 8l2.83 2.83" />
      </svg>
    ),
    badge: "Trending",
    className: "top-[64%] left-3 2xl:left-8",
    duration: "5.8s",
    delay: "1s",
    glow: "shadow-[0_0_15px_rgba(192,132,252,0.2)]",
  },
  {
    label: "Web Dev",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#34D399] fill-none stroke-current stroke-[2]">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    badge: "Full Stack",
    className: "top-[10%] right-4 2xl:right-10",
    duration: "4.8s",
    delay: "0.5s",
    glow: "shadow-[0_0_15px_rgba(52,211,153,0.2)]",
  },
  {
    label: "AWS Cloud",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#FBBF24] fill-none stroke-current stroke-[2]">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
      </svg>
    ),
    badge: "Certified",
    className: "top-[42%] right-3 2xl:right-8",
    duration: "5.2s",
    delay: "1.5s",
    glow: "shadow-[0_0_15px_rgba(251,191,36,0.2)]",
  },
  {
    label: "DevOps & CI/CD",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#F43F5E] fill-none stroke-current stroke-[2]">
        <path d="M4 17l6-6-6-6m8 14h8" />
      </svg>
    ),
    badge: "Hands-on",
    className: "top-[70%] right-6 2xl:right-12",
    duration: "6.0s",
    delay: "0.8s",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.2)]",
  },
];

const stats = [
  { value: "500+", label: "Learners Trained", highlight: "Global community" },
  { value: "3+", label: "Flagship Programs", highlight: "Industry curated" },
  { value: "100%", label: "Hands-on Projects", highlight: "Portfolio ready" },
  { value: "4.9/5", label: "Student Rating", highlight: "Verified reviews" },
];

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-[#0B0A12] overflow-hidden flex flex-col items-center justify-center pt-24 pb-12 sm:pt-28 sm:pb-16">
      {/* Background ambient lighting and grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft top-center spotlight */}
        <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#8B5CF6]/20 via-[#7C3AED]/10 to-transparent blur-[110px] rounded-full" />
        
        {/* Secondary atmospheric glows */}
        <div
          className="absolute -right-24 top-1/4 w-[480px] h-[480px] rounded-full bg-[#8B5CF6]/12 blur-[130px]"
          style={{ animation: "heroPulse 9s ease-in-out infinite" }}
        />
        <div
          className="absolute -left-20 bottom-10 w-[420px] h-[420px] rounded-full bg-[#7C3AED]/10 blur-[120px]"
          style={{ animation: "heroPulse 11s ease-in-out infinite 1.5s" }}
        />

        {/* Tech Grid with smooth radial vignette */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(#FFFFFF 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Floating skill cards — visible on xl+ screens where side margin allows */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block">
        {chips.map((c) => (
          <div
            key={c.label}
            className={`absolute ${c.className} flex items-center gap-2.5 text-xs font-semibold text-[#F8F7FC] bg-[#15141F]/90 border border-white/10 hover:border-[#8B5CF6]/50 backdrop-blur-xl rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 z-20 ${c.glow}`}
            style={{ animation: `floatUp ${c.duration} ease-in-out ${c.delay} infinite` }}
          >
            <span className="p-1 rounded-full bg-white/5 border border-white/10">
              {c.icon}
            </span>
            <span>{c.label}</span>
            <span className="text-[9px] text-[#A6A3B0] bg-white/5 px-2 py-0.5 rounded-full font-medium border border-white/5">
              {c.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Hero content container */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Live cohort announcement badge */}
        <div className="group inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-wide text-[#E9D5FF] bg-gradient-to-r from-[#8B5CF6]/20 via-[#7C3AED]/15 to-[#8B5CF6]/20 border border-[#8B5CF6]/35 rounded-full px-3.5 py-1.5 mb-4 sm:mb-5 backdrop-blur-md shadow-[0_0_16px_rgba(139,92,246,0.18)] cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A855F7]" />
          </span>
          <span>Live Instructor-Led Tech Academy</span>
          <span className="text-white/30 hidden xs:inline">•</span>
          <span className="text-[#C4B5FD] font-normal hidden xs:inline">100% Practical</span>
        </div>

        {/* Main Title - balanced and prevented from breaking awkwardly */}
        <h1 className="font-[Manrope] font-extrabold text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] leading-[1.2] sm:leading-[1.18] tracking-tight text-[#F8F7FC] mb-3 sm:mb-4 max-w-2xl sm:max-w-3xl">
          Master Future Skills.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] via-[#D8B4FE] to-[#A855F7] drop-shadow-[0_4px_24px_rgba(168,85,247,0.3)] whitespace-nowrap">
            Build Real Projects.
          </span>{" "}
          <span className="inline-block whitespace-nowrap">Learn from Anywhere.</span>
        </h1>

        {/* Subtitle - compact and readable */}
        <p className="text-xs sm:text-sm md:text-[15px] text-[#A6A3B0] max-w-xl mb-5 sm:mb-6 leading-relaxed font-normal">
          Live online, instructor-led technology training designed to help learners
          build practical skills, real-world portfolio projects, and industry-ready confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 mb-6 sm:mb-7 w-full sm:w-auto">
          <a
            href="#courses"
            className="group relative inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:opacity-95 rounded-full px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 shadow-[0_8px_24px_rgba(139,92,246,0.35)] hover:shadow-[0_12px_32px_rgba(139,92,246,0.55)] hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto text-center"
          >
            <span>Explore Programs</span>
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 stroke-current fill-none stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#F8F7FC] bg-[#15141F]/90 border border-white/15 hover:border-[#8B5CF6]/60 hover:bg-[#1E1C2D] hover:-translate-y-0.5 active:scale-[0.98] rounded-full px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 shadow-sm w-full sm:w-auto text-center"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#C4B5FD] fill-none stroke-current stroke-[2]">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Free Consultation</span>
          </a>
        </div>

        {/* Social Proof & Rating Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-7 sm:mb-9 text-[11px] sm:text-xs text-[#A6A3B0]">
          {/* Overlapping student avatar cluster */}
          <div className="flex -space-x-1.5 overflow-hidden">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-[#9333EA] to-[#C084FC] text-white font-bold text-[9px] ring-2 ring-[#0B0A12]">
              AK
            </span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] text-white font-bold text-[9px] ring-2 ring-[#0B0A12]">
              RS
            </span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-[#059669] to-[#34D399] text-white font-bold text-[9px] ring-2 ring-[#0B0A12]">
              PT
            </span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-[#D97706] to-[#FBBF24] text-white font-bold text-[9px] ring-2 ring-[#0B0A12]">
              MK
            </span>
          </div>

          {/* Star rating and review count */}
          <div className="flex items-center gap-1.5">
            <div className="flex text-[#FBBF24] text-xs">
              {"★".repeat(5)}
            </div>
            <span className="font-semibold text-[#F8F7FC]">4.9/5</span>
            <span className="text-[#8E8B9D]">from 500+ happy learners</span>
          </div>
        </div>

        {/* Trust Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 py-4 sm:py-5 px-3 sm:px-6 rounded-2xl bg-gradient-to-b from-[#15141F]/80 to-[#12111B]/80 border border-white/10 backdrop-blur-xl w-full max-w-2xl shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className={`text-center relative flex flex-col items-center justify-center px-2 ${
                idx !== stats.length - 1 ? "sm:border-r sm:border-white/10" : ""
              }`}
            >
              <div className="font-[Manrope] font-extrabold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F8F7FC] to-[#C4B5FD] tracking-tight">
                {s.value}
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#F8F7FC] font-semibold tracking-wide mt-0.5">
                {s.label}
              </div>
              <div className="text-[9px] text-[#8E8B9D] mt-0.5">
                {s.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes heroPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.12); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}