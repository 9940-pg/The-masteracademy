import { useState } from "react";

const channels = [
  { label: "واتساب الإمارات", value: "+971 50 123 4567 / +91 93257 19765", href: "https://wa.me/919325719765?text=مرحباً%20ذا%20ماستر%20أكاديمي%20الإمارات" },
  { label: "البريد الإلكتروني", value: "themasteracademy26@gmail.com", href: "mailto:themasteracademy26@gmail.com" },
  { label: "إنستغرام", value: "@learn.withmasteracademy", href: "https://instagram.com/learn.withmasteracademy" },
  { label: "لينكد إن", value: "The Master Academy UAE", href: "https://linkedin.com" },
  { label: "يوتيوب", value: "@the_masteracademy", href: "https://youtube.com" },
];

const courseOptions = [
  "البرمجة بلغة بايثون والذكاء الاصطناعي (دورة مكثفة — 49 د.إ)",
  "تطوير الويب العملي بمشاريع حقيقية والذكاء الاصطناعي (دورة مكثفة — 49 د.إ)",
  "الحوسبة السحابية مع AWS و DevOps (دورة مكثفة — 49 د.إ)",
  "البرمجة بلغة بايثون والذكاء الاصطناعي — البرنامج الاحترافي (12 أسبوعاً)",
  "تطوير تطبيقات الويب المتكاملة مع الذكاء الاصطناعي — البرنامج الاحترافي (12 أسبوعاً)",
  "مهندس الحوسبة السحابية AWS و DevOps — البرنامج الاحترافي (12 أسبوعاً)",
  "استشارة تعليمية وإرشاد مهني عام",
];

export default function Contact({ prefilledCourse }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: prefilledCourse || courseOptions[0],
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch("/uae-api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "uae_whatsapp_inquiry_button" }),
      }).catch(() => {});
    } catch {
      // Ignore background log errors
    }

    const text = encodeURIComponent(
      `مرحباً ذا ماستر أكاديمي الإمارات! اسمي ${formData.name || "مهتم بالتعلم"}.\n\n` +
      `البريد الإلكتروني: ${formData.email || "غير متوفر"}\n` +
      `الهاتف: ${formData.phone || "غير متوفر"}\n` +
      `الدورة المطلوبة: ${formData.course}\n` +
      `الرسالة: ${formData.message || "أود الاستفسار عن تفاصيل الدفعة القادمة ورسوم التسجيل في الإمارات."}`
    );
    window.open(`https://wa.me/919325719765?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/uae-api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "uae_website_contact_form" }),
      });
      if (!res.ok) {
        console.warn("API responded with status:", res.status);
      }
    } catch (err) {
      console.warn("Backend API offline or unreachable; using client fallback:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <>
      <section id="contact" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16">
          <div>
            <span className="block text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-3">
              تواصل معنا في الإمارات
            </span>
            <h2 className="font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.18] text-[#F8F7FC] mb-5 break-words">
              دعنا نتحدث عن أهدافك وطموحك التقني
            </h2>
            <p className="text-[#A6A3B0] text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
              هل لديك استفسارات حول مناهج الدورات، أو مواعيد الدفعات، أو تريد استشارة مهنية مجانية؟ فريق القبول متاح لمساعدتك في اتخاذ القرار الأمثل.
            </p>

            <div className="flex flex-col gap-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 bg-[#15141F] border border-white/10 hover:border-[#8B5CF6]/50 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 transition-all duration-200 group"
                >
                  <span className="text-[11px] sm:text-xs font-bold tracking-[1.5px] text-[#C4B5FD] group-hover:text-white transition-colors shrink-0">
                    {c.label}
                  </span>
                  <span className="text-xs sm:text-sm text-[#F8F7FC] group-hover:text-[#C4B5FD] transition-colors break-all sm:break-normal text-left dir-ltr">
                    {c.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#15141F] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="font-bold text-2xl text-[#F8F7FC]">تم استلام رسالتك بنجاح!</h3>
                <p className="text-sm text-[#A6A3B0] max-w-sm mx-auto leading-relaxed">
                  شكراً لتواصلك مع ذا ماستر أكاديمي الإمارات. سيتواصل معك أحد مستشاري القبول عبر واتساب أو البريد الإلكتروني خلال 24 ساعة.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-[#C4B5FD] underline hover:text-white"
                >
                  إرسال استفسار آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#A6A3B0] mb-1.5">الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="مثال: راشد الشامسي"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8F7FC] placeholder:text-[#646173] outline-none focus:border-[#8B5CF6] transition-colors text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#A6A3B0] mb-1.5">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="مثال: rashed@example.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8F7FC] placeholder:text-[#646173] outline-none focus:border-[#8B5CF6] transition-colors text-right"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#A6A3B0] mb-1.5">رقم الهاتف / واتساب (الإمارات)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="مثال: +971 50 123 4567"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8F7FC] placeholder:text-[#646173] outline-none focus:border-[#8B5CF6] transition-colors text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#A6A3B0] mb-1.5">الدورة التدريبية المطلوبة</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full bg-[#1A1926] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8F7FC] outline-none focus:border-[#8B5CF6] transition-colors text-right"
                    >
                      {courseOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#15141F] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A6A3B0] mb-1.5">رسالتك أو استفسارك</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="أخبرنا عن طموحك المهني أو أي استفسار يخص الدفع بالتقسيط أو المواعيد..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F8F7FC] placeholder:text-[#646173] outline-none focus:border-[#8B5CF6] transition-colors resize-none text-right"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:opacity-95 rounded-full px-7 py-3.5 transition-all shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:scale-[1.02]"
                  >
                    <span>استفسار فوري عبر واتساب</span>
                    <span>→</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-[#F8F7FC] bg-white/5 hover:bg-white/10 border border-white/15 rounded-full px-7 py-3.5 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال النموذج"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Upgraded High-Converting Pre-Footer CTA */}
      <section className="relative bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden border-t border-white/5 text-center">
        {/* Ambient Glows & Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-gradient-to-r from-[#8B5CF6]/20 via-[#A855F7]/25 to-[#6D28D9]/20 blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Center Card */}
        <div className="relative z-10 max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#181628]/95 to-[#12111D]/95 border border-white/15 p-6 sm:p-10 md:p-16 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[2px] text-[#C4B5FD] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 rounded-full px-4 py-1.5 mb-5 sm:mb-6 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7] animate-pulse" />
            🇦🇪 التسجيل مفتوح للدفعات القادمة في دولة الإمارات
          </div>

          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-[1.25] text-[#F8F7FC] max-w-2xl mx-auto mb-4 sm:mb-5">
            هل أنت مستعد لبناء مهاراتك البرمجية واكتساب{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] via-[#A855F7] to-[#8B5CF6]">
              ثقة تقنية حقيقية؟
            </span>
          </h2>

          <p className="text-[#A6A3B0] text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed font-normal">
            انضم إلى مئات المتدربين الطموحين في الإمارات الذين طوروا مسارهم المهني مع دورات ذا ماستر أكاديمي التطبيقية المباشرة.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 w-full sm:w-auto">
            <a
              href="#courses"
              className="group inline-flex items-center justify-center gap-3 text-sm md:text-base font-bold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:opacity-95 hover:scale-[1.02] rounded-full px-8 py-3.5 sm:py-4 transition-all duration-300 shadow-[0_12px_36px_rgba(139,92,246,0.45)] w-full sm:w-auto text-center"
            >
              <span>استكشف جميع الدورات (من 49 د.إ)</span>
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="https://wa.me/919325719765?text=مرحباً%20ذا%20ماستر%20أكاديمي%20الإمارات،%20أنا%20جاهز%20للتسجيل%20وأرجو%20إرشادي."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 text-sm md:text-base font-bold text-[#F8F7FC] bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#8B5CF6]/50 rounded-full px-8 py-3.5 sm:py-4 transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto text-center"
            >
              <span>تحدث مع فريق القبول</span>
            </a>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/10 text-xs sm:text-sm text-[#D5D3DC]">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#8B5CF6] font-bold">✓</span> تدريب 100% تطبيقي
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#8B5CF6] font-bold">✓</span> بناء مشاريع حية
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#8B5CF6] font-bold">✓</span> شهادات إتمام موثقة
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#8B5CF6] font-bold">✓</span> تسجيلات كاملة مدى الحياة
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
