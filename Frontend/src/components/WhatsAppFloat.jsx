export default function WhatsAppFloat() {
  return (
    <aside
      aria-label="Quick contact"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 pointer-events-auto"
    >
      <a
        href="https://wa.me/919325719765?text=Hi%20Master%20Academy!%20I%20have%20an%20inquiry%20regarding%20upcoming%20courses."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Admissions on WhatsApp"
        className="flex items-center gap-2 sm:gap-2.5 bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#B46BF8] hover:to-[#8B5CF6] text-white px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-full shadow-[0_8px_30px_rgba(139,92,246,0.55)] border border-white/20 hover:scale-105 transition-all duration-300 group"
      >
        {/* WhatsApp Icon */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
          <path d="M12.031 2C6.496 2 2 6.495 2 12.03c0 1.97.57 3.81 1.559 5.367L2 22.25l5.011-1.528A10.02 10.02 0 0012.031 22c5.534 0 10.03-4.496 10.03-10.03 0-5.535-4.496-10.03-10.03-10.03zm5.885 14.283c-.247.697-1.428 1.332-1.97 1.385-.503.05-1.157.08-3.35-.83-2.535-1.053-4.148-3.64-4.275-3.81-.127-.169-1.026-1.365-1.026-2.604 0-1.24.646-1.849.878-2.096.233-.247.509-.309.678-.309.17 0 .339.002.487.01.157.009.366-.06.573.438.212.508.723 1.764.787 1.892.063.127.106.275.021.444-.085.17-.127.275-.254.423-.127.148-.267.33-.381.444-.127.127-.26.265-.112.519.149.254.658 1.085 1.411 1.756.969.864 1.785 1.132 2.039 1.259.254.127.402.106.55-.063.149-.17.636-.74 1.059-1.291.17-.212.339-.17.572-.085.233.085 1.482.698 1.736.825.254.127.424.19.487.296.064.106.064.614-.183 1.311z" />
        </svg>
        <span className="text-xs sm:text-sm font-bold tracking-wide">
          Chat with Us
        </span>
        <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-ping" />
      </a>
    </aside>
  );
}
