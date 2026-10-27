import { useState, useEffect, useId, useRef } from "react";
import SpotlightCard from "./SpotlightCard";

// Initial fallback testimonials in Arabic
const defaultTestimonials = [
  {
    id: 1,
    name: "آدم داس",
    role: "خريج بايثون والذكاء الاصطناعي (دبي)",
    course: "Generative AI & Agentic Python",
    rating: 5,
    comment:
      "تجربة استثنائية! تعلمت الكثير في بايثون والذكاء الاصطناعي وبدأت في بناء أول مشاريعي الذكية. التوجيه المباشر ومراجعة الكود الحي في الحصص صنع الفارق الكبير.",
    created_at: "2026-09-15T10:30:00.000Z",
  },
  {
    id: 2,
    name: "سارة المنصوري",
    role: "مطورة ويب واجهات أمامية (أبوظبي)",
    course: "Full-Stack Web Development",
    rating: 5,
    comment:
      "المنهج منظم ومبسط للغاية وخالٍ من الحشو النظري. تعلمت هندسة واجهات الويب وتكامل الذكاء الاصطناعي عملياً وبنيت بورتفوليو قوي أفتخر به.",
    created_at: "2026-09-20T14:15:00.000Z",
  },
  {
    id: 3,
    name: "محمد حسن",
    role: "متدرب سحابة AWS و DevOps (الشارقة)",
    course: "AWS Cloud & DevOps Engineering",
    rating: 5,
    comment:
      "المدربون لا يكتفون بشرح الأوامر البرمجية، بل يعلمونك كيف تفكر كمهندس سحابي وتدير سيرفرات ضخمة، وكيف تتحدث في المقابلات الوظيفية كخبير محترف.",
    created_at: "2026-10-02T18:45:00.000Z",
  },
  {
    id: 4,
    name: "عمر خالد",
    role: "مهندس برمجيات ناشئ (دبي)",
    course: "Modern JavaScript & React.js",
    rating: 5,
    comment:
      "الدورة أعطتني في أسابيع ما عجزت عن تعلمه طوال شهور من الدراسة الذاتية والتشتت، بفضل المتابعة الفردية مع المدرب ومجتمع الخريجين الداعم.",
    created_at: "2026-10-08T09:20:00.000Z",
  },
  {
    id: 5,
    name: "فاطمة العلي",
    role: "موظفة ومطورة أتمتة (عجمان)",
    course: "Full-Stack Web Development",
    rating: 5,
    comment:
      "أفضل استثمار تدريبي قمت به في الإمارات. مرونة المواعيد المسائية سمحت لي بالتوفيق التام بين التزامات وظيفتي وحضور الحصص المباشرة.",
    created_at: "2026-10-14T16:10:00.000Z",
  },
  {
    id: 6,
    name: "راشد الشامسي",
    role: "مستقل ورائد أعمال رقمي (دبي)",
    course: "Python & Data Science",
    rating: 5,
    comment:
      "بيئة تعليمية داعمة ومحفزة للغاية، استطعت إطلاق أول موقع ويب تفاعلي وتطبيق سحابي متكامل لشركتي بعد أسابيع قليلة من التدريب.",
    created_at: "2026-10-19T11:00:00.000Z",
  },
];

const availableCourses = [
  "هندسة الذكاء الاصطناعي وبايثون المتقدم",
  "تطوير الويب الشامل (Full-Stack Web)",
  "هندسة السحابة والحوسبة AWS & DevOps",
  "جافاسكريبت ورياكت الحديثة (React.js)",
  "علم البيانات وتحليل الأعمال بالذكاء الاصطناعي",
  "دورة أخرى / تجربة عامة في الأكاديمية",
];

function StarIcons({ rating = 5, size = "w-4 h-4" }) {
  return (
    <div className="flex items-center gap-1" aria-label={`تقييم ${rating} من 5 نجوم`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < rating;
        return (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`${size} transition-colors ${
              isFilled
                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.45)]"
                : "fill-white/10 text-white/20"
            }`}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

function InteractiveRatingPicker({ value, onChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  const ratingDescriptions = {
    5: "5 نجوم — ممتاز جداً! فاق جميع التوقعات",
    4: "4 نجوم — جيد جداً! محتوى تدريبي قوي وعملي",
    3: "3 نجوم — جيد! توجيه مفيد ومشاريع جيدة",
    2: "نجمتان — مقبول! يحتاج لبعض التحسينات",
    1: "نجمة واحدة — ضعيف! لم يلبِ التوقعات",
  };

  const currentLevel = hoverRating || value;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const starNumber = i + 1;
          const active = starNumber <= currentLevel;
          return (
            <button
              key={starNumber}
              type="button"
              onClick={() => onChange(starNumber)}
              onMouseEnter={() => setHoverRating(starNumber)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 rounded-lg hover:bg-white/10 transition-transform active:scale-90 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 cursor-pointer"
              aria-label={`تقييم ${starNumber} نجوم`}
            >
              <svg
                viewBox="0 0 20 20"
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-all ${
                  active
                    ? "fill-amber-400 text-amber-400 scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                    : "fill-white/15 text-white/20 hover:fill-amber-200/40"
                }`}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          );
        })}
      </div>
      <p className="text-xs font-medium text-[#C4B5FD] transition-all">
        {ratingDescriptions[currentLevel] || "اختر تقييمك"}
      </p>
    </div>
  );
}

function AddReviewModal({ isOpen, onClose, onReviewAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    course: availableCourses[0],
    rating: 5,
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const modalTitleId = useId();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setErrorMsg("");
      setSuccessMsg("");
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("يرجى إدخال اسمك الكريم.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg("يرجى إدخال بريدك الإلكتروني.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg("يرجى إدخال بريد إلكتروني صحيح.");
      return;
    }
    if (!formData.comment.trim() || formData.comment.trim().length < 5) {
      setErrorMsg("يرجى كتابة رأيك وتجربتك بالتفصيل (5 أحرف على الأقل).");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/uae-api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "تعذر حفظ التقييم حالياً. يرجى المحاولة لاحقاً.");
      }

      setSuccessMsg("🎉 شكراً لك! تم حفظ تقييمك ورأيك بنجاح في قاعدة البيانات.");
      onReviewAdded(result.data);

      setTimeout(() => {
        onClose();
        setFormData({
          name: "",
          email: "",
          phone: "",
          role: "",
          course: availableCourses[0],
          rating: 5,
          comment: "",
        });
        setSuccessMsg("");
      }, 1600);
    } catch (err) {
      setErrorMsg(err.message || "حدث خطأ أثناء إرسال التقييم.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#15141F] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-64 h-64 bg-gradient-to-tr from-[#8B5CF6]/25 to-amber-500/20 blur-[80px] rounded-full absolute -top-20 -left-20 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 px-6 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-4 border-b border-white/10 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD] text-[11px] font-bold uppercase tracking-wider mb-2">
              <span>⭐ تجربة المتدربين في الإمارات</span>
            </div>
            <h3 id={modalTitleId} className="text-xl sm:text-2xl font-extrabold text-[#F8F7FC]">
              شارك تجربتك وتقييمك للأكاديمية
            </h3>
            <p className="text-xs sm:text-sm text-[#A6A3B0] mt-1">
              يتم حفظ تقييمك ورأيك في قاعدة البيانات لمساعدة المتدربين الجدد.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[#A6A3B0] hover:text-white flex items-center justify-center transition-colors text-sm font-semibold shrink-0 cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="relative z-10 overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/35 text-red-300 text-xs sm:text-sm flex items-center gap-2.5">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-sm font-medium flex items-center gap-3 animate-pulse">
              <span className="text-lg">✓</span>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Rating */}
            <div className="bg-[#1D1B2D]/90 border border-white/10 rounded-xl p-4 sm:p-5">
              <label className="block text-xs font-bold text-[#F8F7FC] mb-2">
                تقييمك الإجمالي <span className="text-red-400">*</span>
              </label>
              <InteractiveRatingPicker
                value={formData.rating}
                onChange={(r) => setFormData((prev) => ({ ...prev, rating: r }))}
              />
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#D5D3DC] mb-1.5">
                  الاسم الكامل <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أحمد المنصوري"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1B2D] border border-white/10 text-sm text-[#F8F7FC] placeholder-[#6E6B7B] focus:outline-none focus:border-[#8B5CF6] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D5D3DC] mb-1.5">
                  البريد الإلكتروني <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="ahmed@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1B2D] border border-white/10 text-sm text-[#F8F7FC] placeholder-[#6E6B7B] focus:outline-none focus:border-[#8B5CF6] transition-all"
                />
              </div>
            </div>

            {/* Phone & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#D5D3DC] mb-1.5">
                  رقم الهاتف / واتساب (اختياري)
                </label>
                <input
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1B2D] border border-white/10 text-sm text-[#F8F7FC] placeholder-[#6E6B7B] focus:outline-none focus:border-[#8B5CF6] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D5D3DC] mb-1.5">
                  المسمى المهني / التخصص
                </label>
                <input
                  type="text"
                  placeholder="مثال: مهندس واجهات / خريج بايثون (دبي)"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1B2D] border border-white/10 text-sm text-[#F8F7FC] placeholder-[#6E6B7B] focus:outline-none focus:border-[#8B5CF6] transition-all"
                />
              </div>
            </div>

            {/* Course */}
            <div>
              <label className="block text-xs font-semibold text-[#D5D3DC] mb-1.5">
                الدورة التي التحقت بها
              </label>
              <select
                value={formData.course}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, course: e.target.value }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1B2D] border border-white/10 text-sm text-[#F8F7FC] focus:outline-none focus:border-[#8B5CF6] transition-all"
              >
                {availableCourses.map((c) => (
                  <option key={c} value={c} className="bg-[#15141F] text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Review Comment */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#D5D3DC]">
                  رأيك وتجربتك التعليمية <span className="text-red-400">*</span>
                </label>
                <span className="text-[10px] text-[#A6A3B0]">
                  {formData.comment.length} / 1000
                </span>
              </div>
              <textarea
                required
                rows={4}
                maxLength={1000}
                placeholder="كيف كانت جودة الشرح، توجيه المدرب المباشر، وتطبيق المشاريع البرمجية العملية؟ شارك تجربتك بكل شفافية..."
                value={formData.comment}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, comment: e.target.value }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1D1B2D] border border-white/10 text-sm text-[#F8F7FC] placeholder-[#6E6B7B] focus:outline-none focus:border-[#8B5CF6] transition-all resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#A6A3B0] hover:text-white transition-colors cursor-pointer"
              >
                إلغاء
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#7C3AED] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-[0_8px_24px_rgba(139,92,246,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>جاري حفظ التقييم...</span>
                ) : (
                  <>
                    <span>إرسال التقييم والتجربة</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [stats, setStats] = useState({
    total: defaultTestimonials.length,
    averageRating: 5.0,
    distribution: { 5: defaultTestimonials.length, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerAlert, setBannerAlert] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/uae-api/testimonials?limit=100");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setTestimonials(json.data);
          if (json.stats) {
            setStats(json.stats);
          }
        }
      }
    } catch (e) {
      console.warn("Using fallback UAE testimonials:", e.message);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleReviewAdded = (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
    setStats((prev) => {
      const newTotal = (prev.total || 0) + 1;
      const prevSum = (prev.averageRating || 5) * (prev.total || 0);
      const newAvg = Number(((prevSum + (newReview.rating || 5)) / newTotal).toFixed(1));
      const dist = { ...prev.distribution };
      dist[newReview.rating] = (dist[newReview.rating] || 0) + 1;
      return {
        total: newTotal,
        averageRating: newAvg,
        distribution: dist,
      };
    });

    setBannerAlert(`🎉 شكراً لك ${newReview.name}! تم حفظ تقييمك ورأيك بنجاح.`);
    setTimeout(() => setBannerAlert(null), 6000);
  };

  const filteredTestimonials = testimonials
    .filter((item) => {
      if (selectedRating === "all") return true;
      return item.rating === parseInt(selectedRating, 10);
    })
    .sort((a, b) => {
      if (sortBy === "highest") {
        return (b.rating || 5) - (a.rating || 5) || new Date(b.created_at) - new Date(a.created_at);
      }
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });

  const totalReviews = stats.total || testimonials.length;
  const avgRating = stats.averageRating || 5.0;

  const [mobileIndex, setMobileIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleMobileScroll = (e) => {
    const el = e.target;
    if (!el || el.children.length === 0) return;
    const cardWidth = el.children[0].offsetWidth || 1;
    const scrollPos = el.scrollLeft;
    const newIdx = Math.round(scrollPos / (cardWidth + 16));
    setMobileIndex(Math.min(filteredTestimonials.length - 1, Math.max(0, newIdx)));
  };

  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setMobileIndex(index);
    }
  };

  const prevCard = () => {
    const next = Math.max(0, mobileIndex - 1);
    scrollToCard(next);
  };

  const nextCard = () => {
    const next = Math.min(filteredTestimonials.length - 1, mobileIndex + 1);
    scrollToCard(next);
  };

  return (
    <section
      id="testimonials"
      className="relative bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with CTA Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-3">
              <span>⭐</span>
              <span>آراء وتجارب الخريجين المعتمدة</span>
            </span>
            <h2 className="font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] break-words">
              ماذا يقول خريجونا في الإمارات؟
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#A6A3B0] mt-3 leading-relaxed">
              استمع إلى تجارب حقيقية من طلاب ومهنيين طوّروا مسارهم التكنولوجي مع ذا ماستر أكاديمي في دبي وأبوظبي وكافة إمارات الدولة.
            </p>
          </div>

          {/* Action to Open Modal */}
          <div className="shrink-0">
            <button
              type="button"
              id="open-add-testimonial-btn"
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#7C3AED] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-[0_8px_24px_rgba(139,92,246,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span className="text-base">✍️</span>
              <span>شارك تجربتك وتقييمك</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Temporary Alert Banner */}
        {bannerAlert && (
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/25 to-emerald-500/20 border border-[#8B5CF6]/40 text-[#F8F7FC] text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-xl">🌟</span>
              <span className="font-medium">{bannerAlert}</span>
            </div>
            <button
              type="button"
              onClick={() => setBannerAlert(null)}
              className="text-[#A6A3B0] hover:text-white text-xs px-2 py-1 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Ratings Overview Summary Card */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-[#15141F]/80 border border-white/10 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left: Overall Score */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-[#F8F7FC]">
                  {avgRating.toFixed(1)}
                </span>
                <span className="text-lg text-[#A6A3B0] font-semibold">/ 5.0</span>
              </div>
              <div className="mt-2">
                <StarIcons rating={Math.round(avgRating)} size="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-xs sm:text-sm text-[#C4B5FD] font-semibold mt-2">
                بناءً على {totalReviews} تقييماً معتمداً
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold">
                <span>🛡️</span>
                <span>تجارب حقيقية موثقة ومحفوظة في قاعدة البيانات</span>
              </div>
            </div>

            {/* Middle: Star Breakdown Bars */}
            <div className="md:col-span-5 space-y-2 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = stats.distribution?.[stars] || 0;
                const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                return (
                  <button
                    key={stars}
                    type="button"
                    onClick={() =>
                      setSelectedRating((prev) => (prev === String(stars) ? "all" : String(stars)))
                    }
                    className="w-full flex items-center gap-3 text-xs group cursor-pointer text-left hover:opacity-100"
                  >
                    <span className="w-12 text-[#D5D3DC] group-hover:text-amber-300 font-semibold flex items-center gap-1 shrink-0">
                      <span>{stars}</span>
                      <span className="text-amber-400">★</span>
                    </span>

                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden relative">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#8B5CF6] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <span className="w-12 text-right text-[#A6A3B0] font-mono text-[11px] shrink-0">
                      {count} ({pct}%)
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Quick Features / Trust Highlights */}
            <div className="md:col-span-3 flex flex-col justify-center space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center text-[#C4B5FD] text-sm shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold text-[#F8F7FC]">توجيه تدريبي فردي</div>
                  <div className="text-[11px] text-[#A6A3B0]">حل المشكلات ومتابعة برمجية حية</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                  💻
                </div>
                <div>
                  <div className="text-xs font-bold text-[#F8F7FC]">مشاريع واقعية معتمدة</div>
                  <div className="text-[11px] text-[#A6A3B0]">بناء حلول سحابية وتطبيقات ذكية</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 text-sm shrink-0">
                  🎯
                </div>
                <div>
                  <div className="text-xs font-bold text-[#F8F7FC]">قاعدة بيانات متصلة</div>
                  <div className="text-[11px] text-[#A6A3B0]">حفظ الآراء وبيانات التواصل بأمان</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
          {/* Star Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#A6A3B0] mr-1">تصفية التقييمات:</span>

            <button
              type="button"
              id="filter-all-btn"
              onClick={() => setSelectedRating("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedRating === "all"
                  ? "bg-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                  : "bg-white/5 text-[#A6A3B0] hover:bg-white/10 hover:text-white"
              }`}
            >
              جميع التقييمات ({totalReviews})
            </button>

            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.distribution?.[star] || 0;
              return (
                <button
                  key={star}
                  type="button"
                  id={`filter-star-${star}-btn`}
                  onClick={() => setSelectedRating(String(star))}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    selectedRating === String(star)
                      ? "bg-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                      : "bg-white/5 text-[#A6A3B0] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{star}</span>
                  <span className="text-amber-400">★</span>
                  <span>({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="testimonials-sort" className="text-xs text-[#A6A3B0]">
              ترتيب حسب:
            </label>
            <select
              id="testimonials-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#15141F] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-[#F8F7FC] focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
            >
              <option value="newest">الأحدث أولاً</option>
              <option value="highest">الأعلى تقييماً</option>
            </select>
          </div>
        </div>

        {/* Desktop Grid (sm and up) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredTestimonials.map((t, idx) => {
            const initial = t.name ? t.name.trim()[0] : "خ";
            const formattedDate = t.created_at
              ? new Date(t.created_at).toLocaleDateString("ar-AE", {
                  month: "short",
                  year: "numeric",
                })
              : "مؤخراً";

            return (
              <SpotlightCard
                key={t.id || `${t.name}-${idx}`}
                className="h-full rounded-2xl bg-[#15141F] border border-white/10 p-5 sm:p-7 flex flex-col justify-between hover:border-[#8B5CF6]/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <StarIcons rating={t.rating || 5} size="w-4 h-4" />
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
                      <span>✓</span>
                      <span>متدرب معتمد</span>
                    </span>
                  </div>

                  {t.course && (
                    <div className="mb-3">
                      <span className="text-[10px] font-semibold text-[#C4B5FD] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2.5 py-1 rounded-md inline-block max-w-full truncate">
                        📚 {t.course}
                      </span>
                    </div>
                  )}

                  <p className="text-sm text-[#D5D3DC] leading-relaxed mb-6 italic relative">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B5CF6] via-[#A855F7] to-[#C4B5FD] flex items-center justify-center font-black text-white text-sm shadow-md shrink-0">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-[#F8F7FC] font-bold truncate group-hover:text-[#C4B5FD] transition-colors">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-[#A6A3B0] truncate">
                        {t.role || "خريج الأكاديمية"}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#7A7788] whitespace-nowrap shrink-0">
                    {formattedDate}
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Mobile Carousel (<sm screens: horizontal scroll / snap carousel) */}
        <div className="block sm:hidden">
          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 no-scrollbar -mx-4 px-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredTestimonials.map((t, idx) => {
              const initial = t.name ? t.name.trim()[0] : "خ";
              const formattedDate = t.created_at
                ? new Date(t.created_at).toLocaleDateString("ar-AE", {
                    month: "short",
                    year: "numeric",
                  })
                : "مؤخراً";

              return (
                <div key={t.id || `${t.name}-${idx}`} className="w-[86vw] max-w-[340px] shrink-0 snap-center">
                  <SpotlightCard className="h-full rounded-2xl bg-[#15141F] border border-white/10 p-5 flex flex-col justify-between hover:border-[#8B5CF6]/50 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <StarIcons rating={t.rating || 5} size="w-4 h-4" />
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
                          <span>✓</span>
                          <span>متدرب معتمد</span>
                        </span>
                      </div>

                      {t.course && (
                        <div className="mb-3">
                          <span className="text-[10px] font-semibold text-[#C4B5FD] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2.5 py-1 rounded-md inline-block max-w-full truncate">
                            📚 {t.course}
                          </span>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-[#D5D3DC] leading-relaxed mb-6 italic relative">
                        "{t.comment}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B5CF6] via-[#A855F7] to-[#C4B5FD] flex items-center justify-center font-black text-white text-sm shadow-md shrink-0">
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm text-[#F8F7FC] font-bold truncate group-hover:text-[#C4B5FD] transition-colors">
                            {t.name}
                          </div>
                          <div className="text-[11px] text-[#A6A3B0] truncate">
                            {t.role || "خريج الأكاديمية"}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] text-[#7A7788] whitespace-nowrap shrink-0">
                        {formattedDate}
                      </span>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>

          {/* Carousel Navigation Indicators */}
          <div className="flex items-center justify-between mt-4 px-1">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {filteredTestimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToCard(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    mobileIndex === i
                      ? "w-6 bg-[#8B5CF6] shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`الانتقال إلى التقييم ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows & Counter */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevCard}
                disabled={mobileIndex === 0}
                className="w-9 h-9 rounded-full bg-[#15141F] border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#8B5CF6] transition-colors cursor-pointer"
                aria-label="السابق"
              >
                ←
              </button>
              <span className="text-xs text-[#A6A3B0] font-mono px-1">
                {mobileIndex + 1}/{filteredTestimonials.length}
              </span>
              <button
                type="button"
                onClick={nextCard}
                disabled={mobileIndex === filteredTestimonials.length - 1}
                className="w-9 h-9 rounded-full bg-[#15141F] border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#8B5CF6] transition-colors cursor-pointer"
                aria-label="التالي"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewAdded={handleReviewAdded}
      />
    </section>
  );
}
