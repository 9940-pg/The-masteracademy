import { useEffect } from "react";

export default function LanguageModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  const handleSelectEnglish = () => {
    sessionStorage.setItem("tma_language_modal_chosen", "true");
    localStorage.setItem("tma_language_selected", "en");
    onClose();
  };

  const handleSelectArabic = () => {
    sessionStorage.setItem("tma_language_modal_chosen", "true");
    localStorage.setItem("tma_language_selected", "ar");
    // If running in development on port 5173, redirect to port 5174 /uae/
    const isDev = window.location.port === "5173" || window.location.hostname === "localhost";
    const uaeUrl = isDev ? "http://localhost:5174/uae/" : `${window.location.origin}/uae/`;
    window.location.href = uaeUrl;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[460px] max-h-[88vh] flex flex-col bg-[#15141F] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="w-56 h-56 bg-gradient-to-tr from-[#8B5CF6]/20 via-[#A855F7]/25 to-transparent blur-[70px] rounded-full absolute -top-16 -right-16 pointer-events-none" />

        {/* Close Button (✕) */}
        <button
          type="button"
          aria-label="Close language selector"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[#A6A3B0] hover:text-white flex items-center justify-center transition-colors text-xs sm:text-sm font-semibold z-10"
        >
          ✕
        </button>

        {/* Scrollable Container to prevent any cutoff on small screens */}
        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7 space-y-5">
          {/* Modal Header */}
          <div className="flex flex-col items-center text-center pt-1">
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-[#8B5CF6]/25 to-[#A855F7]/30 border border-[#8B5CF6]/35 flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.3)] mb-3">
              <svg
                className="w-6 h-6 text-[#C4B5FD]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h2
              id="language-modal-title"
              className="font-[Manrope] font-extrabold text-xl sm:text-2xl text-[#F8F7FC] leading-snug"
            >
              Select Your Region / اختر منطقتك
            </h2>
            <p className="text-xs text-[#A6A3B0] mt-1.5 max-w-xs leading-relaxed">
              Welcome to The Master Academy. Choose your preferred curriculum and language.
            </p>
          </div>

          {/* Options Grid */}
          <div className="flex flex-col gap-3">
            {/* Option 1: English */}
            <button
              type="button"
              onClick={handleSelectEnglish}
              className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#1D1B2D] border-2 border-[#8B5CF6]/70 hover:border-[#8B5CF6] transition-all duration-200 text-left shadow-[0_4px_20px_rgba(139,92,246,0.15)]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl filter drop-shadow">🌐</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-[#F8F7FC] group-hover:text-[#C4B5FD] transition-colors">
                      English (Global Edition)
                    </span>
                    <span className="text-[10px] font-bold text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A6A3B0] mt-0.5">
                    Stay on this page · English medium · Indian & Global schedule
                  </p>
                </div>
              </div>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </div>
            </button>

            {/* Option 2: Arabic / UAE */}
            <button
              type="button"
              onClick={handleSelectArabic}
              className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#181724] border border-white/10 hover:border-[#8B5CF6]/60 hover:bg-[#1E1C2E] transition-all duration-200 text-right shadow-sm hover:scale-[1.01]"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/5 group-hover:bg-[#8B5CF6] text-white flex items-center justify-center text-xs transition-colors shrink-0">
                →
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      دبي وأبوظبي 🇦🇪
                    </span>
                    <span className="font-bold text-sm sm:text-base text-[#F8F7FC] group-hover:text-[#C4B5FD] transition-colors font-sans">
                      العربية (نسخة الإمارات)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A6A3B0] mt-0.5 font-sans">
                    فتح النسخة العربية · توقيت دبي (GST) · الأسعار بالدرهم (AED)
                  </p>
                </div>
                <span className="text-2xl sm:text-3xl filter drop-shadow">🇦🇪</span>
              </div>
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-[11px] text-[#7A7788] text-center leading-relaxed pt-1">
            You can switch language anytime using the language selector button in the top navigation bar.
          </p>
        </div>
      </div>
    </div>
  );
}
