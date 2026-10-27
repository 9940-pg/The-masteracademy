import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#07060B] px-4 sm:px-6 md:px-12 py-12 sm:py-16 border-t border-white/10 text-xs text-[#9C99A8]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <a href="#home" className="inline-block mb-4">
              <Logo className="h-9 w-auto" />
            </a>
            <p className="text-xs text-[#8E8B9D] leading-relaxed mb-6 max-w-sm">
              Education That Creates Opportunities. Live online, instructor-led technology training designed to build real projects, practical skills, and workplace confidence.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919325719765"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8B5CF6]/20 border border-white/10 hover:border-[#8B5CF6]/50 flex items-center justify-center text-[#C4B5FD] hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12.031 2C6.496 2 2 6.495 2 12.03c0 1.97.57 3.81 1.559 5.367L2 22.25l5.011-1.528A10.02 10.02 0 0012.031 22c5.534 0 10.03-4.496 10.03-10.03 0-5.535-4.496-10.03-10.03-10.03zm5.885 14.283c-.247.697-1.428 1.332-1.97 1.385-.503.05-1.157.08-3.35-.83-2.535-1.053-4.148-3.64-4.275-3.81-.127-.169-1.026-1.365-1.026-2.604 0-1.24.646-1.849.878-2.096.233-.247.509-.309.678-.309.17 0 .339.002.487.01.157.009.366-.06.573.438.212.508.723 1.764.787 1.892.063.127.106.275.021.444-.085.17-.127.275-.254.423-.127.148-.267.33-.381.444-.127.127-.26.265-.112.519.149.254.658 1.085 1.411 1.756.969.864 1.785 1.132 2.039 1.259.254.127.402.106.55-.063.149-.17.636-.74 1.059-1.291.17-.212.339-.17.572-.085.233.085 1.482.698 1.736.825.254.127.424.19.487.296.064.106.064.614-.183 1.311z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/learn.withmasteracademy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8B5CF6]/20 border border-white/10 hover:border-[#8B5CF6]/50 flex items-center justify-center text-[#C4B5FD] hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="mailto:themasteracademy26@gmail.com"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8B5CF6]/20 border border-white/10 hover:border-[#8B5CF6]/50 flex items-center justify-center text-[#C4B5FD] hover:text-white transition-all"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@the_masteracademy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8B5CF6]/20 border border-white/10 hover:border-[#8B5CF6]/50 flex items-center justify-center text-[#C4B5FD] hover:text-white transition-all"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Programs Col */}
          <div>
            <h4 className="text-xs font-bold text-[#F8F7FC] tracking-wider uppercase mb-4">
              Featured Programs
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#courses" className="hover:text-white transition-colors">
                  Python Programming with AI
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition-colors">
                  Practical Web Development & AI
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition-colors">
                  AWS Cloud Computing with DevOps
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition-colors">
                  Live 2-Hour Crash Courses (₹499)
                </a>
              </li>
              <li>
                <a href="#masterclasses" className="hover:text-white transition-colors">
                  Hands-on Live Masterclasses
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-xs font-bold text-[#F8F7FC] tracking-wider uppercase mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#about" className="hover:text-white transition-colors">About Master Academy</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Core Training Pillars</a></li>
              <li><a href="#trainers" className="hover:text-white transition-colors">Industry Mentors</a></li>
              <li><a href="#success" className="hover:text-white transition-colors">Student Success & Proof</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Support</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Admissions & Contact</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-xs font-bold text-[#F8F7FC] tracking-wider uppercase mb-4">
              Contact & Support
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8B5CF6]">📞</span>
                <span>WhatsApp: <a href="https://wa.me/919325719765" className="text-[#F8F7FC] hover:text-[#C4B5FD]">+91 93257 19765</a></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8B5CF6]">✉️</span>
                <span>Email: <a href="mailto:themasteracademy26@gmail.com" className="text-[#F8F7FC] hover:text-[#C4B5FD] break-all sm:break-normal">themasteracademy26@gmail.com</a></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8B5CF6]">🕒</span>
                <span>Admissions: Mon – Sun · 10 AM – 8 PM IST</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#8B5CF6]">🎓</span>
                <span className="text-[#C4B5FD]">100% Online · Live via Zoom</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6 text-xs text-[#8E8B9D]">
            <a href="#contact" className="hover:text-[#F8F7FC] transition-colors">Privacy Policy</a>
            <span className="text-white/15">|</span>
            <a href="#contact" className="hover:text-[#F8F7FC] transition-colors">Terms & Conditions</a>
            <span className="text-white/15">|</span>
            <a href="#contact" className="hover:text-[#F8F7FC] transition-colors">Refund Policy</a>
          </div>

          <div className="text-center md:text-right text-xs text-[#7A7788] leading-relaxed">
            <span>© 2026 Master Academy. All rights reserved. </span>
            <span className="text-[#C4B5FD]">Education That Creates Opportunities.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
