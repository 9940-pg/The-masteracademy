import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

// Merged Arabic Navigation Structure to provide clean breathing room in navbar
const navItems = [
  { label: "الرئيسية", to: "#home" },
  {
    label: "الدورات",
    to: "#courses",
    badge: "الأكثر طلباً",
    sublinks: [
      {
        label: "جميع الدورات",
        to: "#courses",
        badge: "الأكثر طلباً",
        desc: "دورات متقدمة في الذكاء الاصطناعي، وتطوير الويب، والسحابة",
        icon: (
          <svg className="w-4 h-4 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        ),
      },
      {
        label: "مسارات التعلم",
        to: "#programs",
        desc: "خارطة طريق تعليمية شاملة من البداية وحتى الاحتراف",
        icon: (
          <svg className="w-4 h-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ),
      },
      {
        label: "الورش التدريبية الحية",
        to: "#masterclasses",
        desc: "جلسات تطبيقية وتفاعلية نهاية الأسبوع مع المدربين",
        icon: (
          <svg className="w-4 h-4 text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "عن الأكاديمية",
    to: "#about",
    sublinks: [
      {
        label: "نبذة عن الأكاديمية",
        to: "#about",
        desc: "رؤيتنا ورسالتنا ومنهجيتنا التدريبية التفاعلية",
        icon: (
          <svg className="w-4 h-4 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        ),
      },
      {
        label: "المدربون والخبراء",
        to: "#trainers",
        desc: "تعلم من كبار مهندسي البرمجيات في كبرى الشركات التقنية",
        icon: (
          <svg className="w-4 h-4 text-[#34D399]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "التقييمات والنتائج",
    to: "#testimonials",
    sublinks: [
      {
        label: "آراء وتقييمات الطلاب",
        to: "#testimonials",
        badge: "4.9 ★",
        desc: "تقييمات حقيقية وموثقة من طلابنا وخريجينا",
        icon: (
          <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ),
      },
      {
        label: "شهادات وقصص النجاح",
        to: "#success",
        desc: "شهادات إتمام الدورات ورسائل النجاح والتوظيف",
        icon: (
          <svg className="w-4 h-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ),
      },
    ],
  },
  { label: "الأسئلة الشائعة", to: "#faq" },
  { label: "تواصل معنا", to: "#contact" },
];

// All section IDs in order of page layout
const allSectionIds = [
  "#home",
  "#about",
  "#programs",
  "#courses",
  "#masterclasses",
  "#trainers",
  "#why-us",
  "#testimonials",
  "#success",
  "#faq",
  "#contact",
];

export default function Navbar({ onOpenLanguageModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [mobileExpanded, setMobileExpanded] = useState({
    الدورات: true,
    "عن الأكاديمية": false,
    "التقييمات والنتائج": false,
  });
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);

        const scrollPos = window.scrollY + 120;
        for (let i = allSectionIds.length - 1; i >= 0; i--) {
          const sec = document.querySelector(allSectionIds[i]);
          if (sec && sec.offsetTop <= scrollPos) {
            setActiveSection(allSectionIds[i]);
            break;
          }
        }
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setLoaded(true), 200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (e, to) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveSection(to);
    const el = document.querySelector(to);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLanguageClick = (e) => {
    if (onOpenLanguageModal) {
      e.preventDefault();
      onOpenLanguageModal();
    }
  };

  const toggleMobileSub = (label) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isItemActive = (item) => {
    if (activeSection === item.to) return true;
    if (item.sublinks) {
      return item.sublinks.some((sub) => sub.to === activeSection);
    }
    return false;
  };

  const solid = scrolled || menuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
      h-20 px-4 sm:px-6 lg:px-8 xl:px-12 border-b transition-all duration-300
      ${solid
          ? "bg-[#0B0A12]/95 backdrop-blur-md border-white/10 shadow-lg shadow-black/40"
          : "bg-[#0B0A12]/40 backdrop-blur-sm border-transparent"
        }`}
    >
      {/* Left: Logo + Hairline divider + Merged Desktop Navlinks */}
      <div className="flex items-center gap-3 lg:gap-4 xl:gap-8 min-w-0">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center focus:outline-none shrink-0"
          aria-label="The Master Academy UAE الرئيسية"
        >
          <Logo className="h-8 sm:h-9 md:h-10 w-auto" />
        </a>

        <div
          className={`hidden xl:block w-px bg-gradient-to-b from-transparent via-[#8B5CF6]/50 to-transparent
          transition-all duration-700 ease-out
          ${loaded ? "h-6 opacity-100" : "h-0 opacity-0"}`}
        />

        {/* Clean, spacious desktop menu */}
        <ul className="hidden lg:flex items-center gap-1 xl:gap-2.5 2xl:gap-3.5 list-none">
          {navItems.map((item) => {
            const active = isItemActive(item);
            const hasSub = Array.isArray(item.sublinks) && item.sublinks.length > 0;

            if (hasSub) {
              return (
                <li key={item.label} className="relative group">
                  {/* Top-level clickable item with chevron */}
                  <a
                    href={item.to}
                    onClick={(e) => handleNavClick(e, item.to)}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-1 text-xs xl:text-[13px] 2xl:text-sm font-medium tracking-normal py-1.5 px-2 xl:px-3 rounded-lg transition-all duration-200 cursor-pointer
                      ${active
                        ? "text-[#F8F7FC] bg-white/5"
                        : "text-[#A6A3B0] hover:text-[#F8F7FC] hover:bg-white/5"}`}
                  >
                    <span
                      className={`h-1 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6] transition-all duration-200 ease-out
                        ${active ? "w-1 opacity-100 ml-1" : "w-0 opacity-0 ml-0 group-hover:w-1 group-hover:opacity-100 group-hover:ml-1"}`}
                    />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="mr-1 inline-block align-middle text-[8px] xl:text-[8.5px] font-bold tracking-tight text-white px-1.5 py-0.2 rounded-full bg-gradient-to-r from-[#A855F7] to-[#7C3AED] shadow-sm">
                        {item.badge}
                      </span>
                    )}
                    <svg
                      className="w-3 h-3 text-[#A6A3B0] group-hover:text-white transition-transform duration-200 group-hover:rotate-180 shrink-0 mr-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>

                  {/* Dropdown Menu with Hover Bridge */}
                  <div
                    className="absolute top-full right-0 lg:left-0 lg:right-auto pt-2 opacity-0 invisible translate-y-2
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    transition-all duration-200 ease-out z-50 pointer-events-none group-hover:pointer-events-auto"
                  >
                    <div className="w-72 sm:w-80 rounded-2xl bg-[#12111E]/95 backdrop-blur-xl border border-white/12 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.7)] ring-1 ring-white/5">
                      <div className="space-y-1">
                        {item.sublinks.map((sub) => {
                          const isSubActive = activeSection === sub.to;
                          return (
                            <a
                              key={sub.label}
                              href={sub.to}
                              onClick={(e) => handleNavClick(e, sub.to)}
                              className={`group/sub flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                                isSubActive
                                  ? "bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-white"
                                  : "hover:bg-white/5 text-[#D5D3DC] hover:text-white border border-transparent"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                                  isSubActive
                                    ? "bg-[#8B5CF6]/30 text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                                    : "bg-white/5 text-[#A6A3B0] group-hover/sub:bg-[#8B5CF6]/20 group-hover/sub:text-[#C4B5FD]"
                                }`}
                              >
                                {sub.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-semibold tracking-tight text-[#F8F7FC] group-hover/sub:text-[#C4B5FD] transition-colors">
                                    {sub.label}
                                  </span>
                                  {sub.badge && (
                                    <span className="text-[8px] font-bold text-white px-1.5 py-0.2 rounded-full bg-gradient-to-r from-[#A855F7] to-[#7C3AED]">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[#A6A3B0] group-hover/sub:text-[#D5D3DC] line-clamp-1 mt-0.5">
                                  {sub.desc}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <a
                  href={item.to}
                  onClick={(e) => handleNavClick(e, item.to)}
                  aria-current={active ? "page" : undefined}
                  className={`group inline-flex items-center text-xs xl:text-[13px] 2xl:text-sm font-medium tracking-normal py-1.5 px-2 xl:px-3 rounded-lg transition-all duration-200
                    ${active
                      ? "text-[#F8F7FC] bg-white/5"
                      : "text-[#A6A3B0] hover:text-[#F8F7FC] hover:bg-white/5"}`}
                >
                  <span
                    className={`h-1 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6] transition-all duration-200 ease-out
                      ${active ? "w-1 opacity-100 ml-1.5" : "w-0 opacity-0 ml-0 group-hover:w-1 group-hover:opacity-100 group-hover:ml-1.5"}`}
                  />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right: Modern Language Selection Option + CTA button + Mobile toggle */}
      <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3.5 shrink-0 ml-2 sm:ml-4">
        {/* Language Modal Trigger - Enhanced Vector Globe Button */}
        <button
          type="button"
          onClick={handleLanguageClick}
          className="group relative flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 hover:border-[#8B5CF6]/60 text-[#C4B5FD] hover:text-white transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
          title="اختر اللغة / Select Language (English / العربية)"
          aria-label="Language selection"
        >
          {/* Modern SVG Vector Globe Icon */}
          <svg
            className="w-4 h-4 text-[#A855F7] group-hover:text-white transition-transform duration-300 group-hover:rotate-12"
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
          <span className="text-[11px] font-semibold text-[#E2E8F0] tracking-wide">
            EN
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
        </button>

        <a
          href="#courses"
          onClick={(e) => handleNavClick(e, "#courses")}
          className="group hidden sm:inline-flex items-center gap-1.5 lg:gap-2 text-xs xl:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] rounded-full px-3.5 py-1.5 xl:px-5 xl:py-2.5 transition-all duration-300 shadow-[0_8px_24px_rgba(139,92,246,0.35)] whitespace-nowrap"
        >
          <span>استكشف الدورات</span>
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 stroke-current fill-none stroke-[2.2] transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </a>

        {/* Mobile / Tablet Menu Button */}
        <button
          type="button"
          aria-label="القائمة"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shrink-0"
        >
          <span className={`block h-0.5 w-5 rounded-full bg-[#F8F7FC] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`block h-0.5 w-5 rounded-full bg-[#F8F7FC] transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block h-0.5 w-5 rounded-full bg-[#F8F7FC] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </div>

      {/* Mobile nav panel */}
      <div
        aria-hidden={!menuOpen}
        className={`lg:hidden fixed top-20 left-0 right-0 bg-[#0B0A12]/98 backdrop-blur-xl
        border-b border-white/10 overflow-y-auto transition-all duration-300 ease-in-out
        ${menuOpen ? "max-h-[calc(100vh-5rem)] opacity-100 py-6" : "max-h-0 opacity-0 py-0 pointer-events-none"}`}
      >
        <ul className="flex flex-col px-6 space-y-2 list-none">
          {navItems.map((item) => {
            const active = isItemActive(item);
            const hasSub = Array.isArray(item.sublinks) && item.sublinks.length > 0;

            if (hasSub) {
              const isExpanded = mobileExpanded[item.label];
              return (
                <li key={item.label} className="border-b border-white/5 pb-2">
                  <div className="flex items-center justify-between py-2 text-sm font-medium">
                    <a
                      href={item.to}
                      tabIndex={menuOpen ? 0 : -1}
                      onClick={(e) => handleNavClick(e, item.to)}
                      className={`flex items-center gap-2 transition-colors ${
                        active ? "text-[#C4B5FD] font-semibold" : "text-[#A6A3B0] hover:text-[#F8F7FC]"
                      }`}
                    >
                      <span className={`h-1.5 rounded-full bg-[#8B5CF6] transition-all duration-300 ${active ? "w-1.5 opacity-100" : "w-0 opacity-0"}`} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full bg-[#8B5CF6]">
                          {item.badge}
                        </span>
                      )}
                    </a>

                    <button
                      type="button"
                      onClick={() => toggleMobileSub(item.label)}
                      className="p-1.5 rounded-lg text-[#A6A3B0] hover:text-white hover:bg-white/5 transition-colors"
                      aria-label={`تبديل ${item.label}`}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#8B5CF6]" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Sublinks accordion */}
                  {isExpanded && (
                    <div className="pr-4 pl-1 py-1 space-y-1 bg-white/[0.02] rounded-xl my-1">
                      {item.sublinks.map((sub) => {
                        const isSubActive = activeSection === sub.to;
                        return (
                          <a
                            key={sub.label}
                            href={sub.to}
                            tabIndex={menuOpen ? 0 : -1}
                            onClick={(e) => handleNavClick(e, sub.to)}
                            className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                              isSubActive
                                ? "bg-[#8B5CF6]/20 text-[#F8F7FC] font-semibold"
                                : "text-[#A6A3B0] hover:text-[#F8F7FC] hover:bg-white/5"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="shrink-0">{sub.icon}</span>
                              <span className="truncate">{sub.label}</span>
                              {sub.badge && (
                                <span className="text-[8px] font-bold text-white px-1.5 py-0.2 rounded-full bg-[#8B5CF6]">
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[#8B5CF6] text-xs">←</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={item.label} className="border-b border-white/5 last:border-b-0">
                <a
                  href={item.to}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={(e) => handleNavClick(e, item.to)}
                  className={`flex items-center justify-between py-3 text-sm font-medium transition-colors
                    ${active ? "text-[#C4B5FD]" : "text-[#A6A3B0] hover:text-[#F8F7FC]"}`}
                >
                  <div className="flex items-center">
                    <span className={`h-1.5 rounded-full bg-[#8B5CF6] transition-all duration-300 ${active ? "w-1.5 opacity-100 ml-2" : "w-0 opacity-0 ml-0"}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[#8B5CF6]">←</span>
                </a>
              </li>
            );
          })}

          <li className="pt-2">
            <button
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                setMenuOpen(false);
                if (onOpenLanguageModal) onOpenLanguageModal();
              }}
              className="flex w-full items-center justify-between py-2.5 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-[#C4B5FD] hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#A855F7]"
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
                <span>اللغة / Language (EN / العربية)</span>
              </div>
              <span className="text-[#8B5CF6]">⚙</span>
            </button>
          </li>
          <li className="pt-2">
            <a
              href="#courses"
              onClick={(e) => handleNavClick(e, "#courses")}
              className="group inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] rounded-full py-3 shadow-[0_8px_24px_rgba(139,92,246,0.35)]"
            >
              <span>ابدأ التعلم الآن</span>
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2] transition-transform duration-300 group-hover:-translate-x-1">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}