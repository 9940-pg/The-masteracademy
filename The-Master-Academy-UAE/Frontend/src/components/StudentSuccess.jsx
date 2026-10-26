import { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";

const gallery = [
  {
    id: 1,
    type: "شهادة معتمدة",
    title: "شهادة إتمام الدورة الرسمية",
    subtitle: "شهادة رسمية موثقة تُمنح لخريجي ذا ماستر أكاديمي بعد إنجاز ومراجعة مشاريعهم العملية",
    img: `${import.meta.env.BASE_URL}success/student-proof-1.jpg`,
    badge: "شهادة موثقة",
  },
  {
    id: 2,
    type: "تقييم طالب",
    title: "رسائل شكر الطلاب عبر واتساب",
    subtitle: "إشادة المتدربين بأسلوب الشرح العملي والمشاريع الحية وسهولة إيصال المعلومة",
    img: `${import.meta.env.BASE_URL}success/student-proof-2.jpg`,
    badge: "تقييم واتساب",
  },
  {
    id: 3,
    type: "إنجاز مهني",
    title: "ثقة تقنية ونقلة نوعية",
    subtitle: "رسالة حقيقية من متدرب يعبر عن التطور التقني السريع الذي حققه خلال فترة وجيزة",
    img: `${import.meta.env.BASE_URL}success/student-proof-3.jpg`,
    badge: "قصة نجاح",
  },
  {
    id: 4,
    type: "شهادة معتمدة",
    title: "اعتماد المشاريع التطبيقية الحية",
    subtitle: "إثبات كفاءة المتدرب في البرمجة الفعلية، وضبط قواعد البيانات، ونشر التطبيقات السحابية",
    img: `${import.meta.env.BASE_URL}success/student-proof-4.jpg`,
    badge: "مشروع تطبيقي",
  },
  {
    id: 5,
    type: "تقييم طالب",
    title: "دعم مستمر وإرشاد فردي",
    subtitle: "رسائل شكر للمدربين على المتابعة اليومية الدقيقة وحل الصعوبات البرمجية بصدر رحب",
    img: `${import.meta.env.BASE_URL}success/student-proof-5.jpg`,
    badge: "تقييم واتساب",
  },
  {
    id: 6,
    type: "إنجاز مهني",
    title: "اجتياز المقابلات الوظيفية",
    subtitle: "تحول طلاب من خلفيات غير تقنية تماماً إلى مبرمجين واثقين يمتلكون المهارة المطلوبة",
    img: `${import.meta.env.BASE_URL}success/student-proof-6.jpg`,
    badge: "إنجاز الخريجين",
  },
];

export default function StudentSuccess() {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    if (activeImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <section id="success" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-12 sm:mb-14">
          <span className="block text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-3">
            إثباتات ونجاحات موثقة
          </span>
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] break-words">
            شهادات وإنجازات طلابنا
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A6A3B0] mt-3 leading-relaxed">
            تصفح نماذج حقيقية من شهادات التخرج الرسمية الممنوحة لطلابنا، ورسائل الشكر والتقييمات المباشرة عبر واتساب.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <SpotlightCard
              key={item.id}
              className="rounded-2xl bg-[#15141F] border border-white/10 flex flex-col overflow-hidden hover:border-[#8B5CF6]/50 transition-all duration-300 group cursor-pointer"
              onClick={() => setActiveImage(item)}
            >
              {/* Image Container with zoom icon overlay */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#110F1C]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15141F] via-[#15141F]/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[11px] font-bold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] rounded-full px-3 py-1 shadow-md">
                    {item.badge}
                  </span>
                </div>

                {/* Hover Click to Expand Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-white/20 border border-white/40 text-white flex items-center justify-center shadow-xl">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex flex-col grow">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C4B5FD] mb-1">
                  {item.type}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-[#F8F7FC] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A6A3B0] leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#15141F] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">{activeImage.title}</h3>
                <p className="text-xs text-[#A6A3B0]">{activeImage.subtitle}</p>
              </div>
              <button
                type="button"
                aria-label="إغلاق"
                onClick={() => setActiveImage(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto max-h-[75vh] p-2 flex items-center justify-center bg-black/40">
              <img
                src={activeImage.img}
                alt={activeImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
