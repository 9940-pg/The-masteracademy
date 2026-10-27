import SpotlightCard from "./SpotlightCard";

const highlights = [
  "Live Interactive Zoom Classes",
  "Industry-Experienced Trainers",
  "100% Hands-on Real Projects",
  "Lifetime Session Recordings",
  "Verified Certificate of Completion",
  "24/7 Community & Doubt Support",
];

const flexible = [
  "Live Interactive Online Batches",
  "Full HD Session Recordings within 24 Hours",
  "Flexible Weekend & Evening Weekday Slots",
  "Learn from Anywhere in the World (Laptop or Mobile)",
  "Lifetime Access to Course Repositories & Notes",
];

const career = [
  "LinkedIn Profile Audit & Optimization",
  "GitHub Portfolio Architecture Guidance",
  "One-on-One Technical Career Mentoring",
  "Mock Coding Interviews & Soft-Skill Coaching",
  "Direct Referrals to Hiring Partner Networks",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#8B5CF6] fill-none stroke-current stroke-[2.2] shrink-0">
      <circle cx="12" cy="12" r="9" className="opacity-25" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-6 text-center mx-auto">
          <span className="block text-xs font-bold tracking-[2.5px] text-[#C4B5FD] uppercase mb-3">
            WHY CHOOSE US
          </span>
          <h2 className="font-[Manrope] font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] mb-4 sm:mb-5">
            What Makes Master Academy Different
          </h2>
          <p className="text-[#A6A3B0] text-xs sm:text-sm md:text-base leading-relaxed italic">
            "We don't just teach syntax — we cultivate confident, employable problem-solvers."
          </p>
        </div>

        {/* 6 core highlights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-12 sm:mb-16 mt-10 sm:mt-14">
          {highlights.map((h) => (
            <div
              key={h}
              className="flex items-center gap-3.5 bg-[#15141F] border border-white/10 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 hover:border-[#8B5CF6]/40 transition-colors"
            >
              <CheckIcon />
              <span className="text-xs sm:text-sm text-[#F8F7FC] font-semibold">{h}</span>
            </div>
          ))}
        </div>

        {/* 2 Deep Dives */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <SpotlightCard className="bg-[#15141F] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 flex items-center justify-center text-[#C4B5FD] mb-6">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="font-[Manrope] font-bold text-xl sm:text-2xl text-[#F8F7FC] mb-5 sm:mb-6">
              Flexible & Accessible Learning
            </h3>
            <ul className="flex flex-col gap-3.5 sm:gap-4">
              {flexible.map((f) => (
                <li key={f} className="flex items-start gap-3 sm:gap-3.5 text-xs sm:text-sm text-[#D5D3DC] leading-relaxed">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>

          <SpotlightCard className="bg-[#15141F] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 flex items-center justify-center text-[#C4B5FD] mb-6">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
              </svg>
            </div>
            <h3 className="font-[Manrope] font-bold text-xl sm:text-2xl text-[#F8F7FC] mb-5 sm:mb-6">
              End-to-End Career Acceleration
            </h3>
            <ul className="flex flex-col gap-3.5 sm:gap-4">
              {career.map((c) => (
                <li key={c} className="flex items-start gap-3 sm:gap-3.5 text-xs sm:text-sm text-[#D5D3DC] leading-relaxed">
                  <CheckIcon />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}