import { useEffect } from "react";

export default function CourseDetailModal({ course, isOpen, onClose, onSelectForContact }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Master Academy! I'm interested in enrolling in the "${course.title}". Could you please share more details regarding registration and batch dates?`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#15141F] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 md:p-8 border-b border-white/10 bg-[#191825] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold text-[#C4B5FD] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 rounded-full px-3 py-1">
                {course.tag || (course.duration.includes("Week") ? "Full Program" : "Crash Course")}
              </span>
              <span className="text-xs text-[#A6A3B0] bg-white/5 border border-white/10 rounded-full px-3 py-1">
                {course.mode}
              </span>
              <span className="text-xs text-[#A6A3B0] bg-white/5 border border-white/10 rounded-full px-3 py-1">
                Level: {course.level || "Beginner"}
              </span>
            </div>
            <h2 id="modal-title" className="font-sans font-extrabold text-2xl sm:text-3xl text-[#F8F7FC] leading-snug">
              {course.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#C4B5FD] mt-2 font-medium">
              {course.date || course.classes} · Duration: {course.duration}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#D5D3DC] hover:text-white flex items-center justify-center shrink-0 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 divide-y divide-white/5">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-3">
              COURSE OVERVIEW
            </h3>
            <p className="text-sm md:text-base text-[#D5D3DC] leading-relaxed">
              {course.overview}
            </p>
          </div>

          {/* What you will learn */}
          <div className="pt-6">
            <h3 className="text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-4">
              WHAT YOU WILL LEARN
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {course.learn.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#D5D3DC] leading-relaxed">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hands-on Projects */}
          {course.projects && course.projects.length > 0 && (
            <div className="pt-6">
              <h3 className="text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-4">
                HANDS-ON PROJECTS INCLUDED
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.projects.map((proj, idx) => (
                  <div
                    key={proj}
                    className="flex items-center gap-3 bg-[#1D1B2B] border border-white/10 rounded-xl p-3.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/20 text-[#C4B5FD] text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#F8F7FC]">
                      {proj}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Who Should Join */}
          {course.whoShouldJoin && (
            <div className="pt-6">
              <h3 className="text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-4">
                WHO SHOULD JOIN
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.whoShouldJoin.map((w) => (
                  <span
                    key={w}
                    className="inline-flex items-center gap-2 text-xs text-[#D5D3DC] bg-white/[0.04] border border-white/10 rounded-full px-3.5 py-1.5"
                  >
                    ✓ {w}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Course FAQs */}
          {course.faqs && course.faqs.length > 0 && (
            <div className="pt-6">
              <h3 className="text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-4">
                COMMON QUESTIONS
              </h3>
              <div className="space-y-3">
                {course.faqs.map((faq, i) => (
                  <div key={i} className="bg-[#1B1A28] border border-white/5 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-[#F8F7FC] mb-1.5">{faq.question}</h4>
                    <p className="text-xs sm:text-sm text-[#A6A3B0] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 md:p-8 bg-[#12111B] border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] sm:text-xs text-[#7A7788]">Course Investment</div>
            <div className="flex items-baseline gap-2">
              <span className="font-sans font-extrabold text-2xl sm:text-3xl text-[#F8F7FC]">{course.price}</span>
              {course.priceNote && (
                <span className="text-[11px] sm:text-xs text-[#A6A3B0]">({course.priceNote})</span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onSelectForContact) onSelectForContact(course.title);
              }}
              className="flex-1 sm:flex-initial text-xs sm:text-sm font-semibold text-[#F8F7FC] bg-white/5 hover:bg-white/10 border border-white/15 rounded-full px-5 py-3 transition-colors text-center"
            >
              Ask Questions
            </button>
            <a
              href={`https://wa.me/919325719765?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:opacity-95 rounded-full px-6 py-3 transition-all shadow-[0_4px_20px_rgba(139,92,246,0.35)] text-center"
            >
              <span>Enroll on WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
