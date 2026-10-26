import SpotlightCard from "./SpotlightCard";

const highlights = [
  "حصص تفاعلية مباشرة عبر زووم (Zoom)",
  "مدربون ممارسون وخبراء في سوق الإمارات",
  "100% مشاريع تطبيقية وكود حقيقي",
  "تسجيلات فيديو كاملة متاحة مدى الحياة",
  "شهادة إتمام رقمية معتمدة وموثقة",
  "مجتمع تقني وإجابة على الأسئلة على مدار الساعة",
];

const flexible = [
  "دفعات تعليمية مباشرة عبر الإنترنت بنظام تفاعلي كامل",
  "تسجيلات فائقة الوضوح HD متاحة خلال 24 ساعة من انتهاء الحصة",
  "مواعيد مسائية وأيام العطلات تناسب الموظفين والطلاب في الإمارات",
  "تعلّم من أي مكان (دبي، أبوظبي، الشارقة، أو أي إمارة)",
  "وصول غير محدود لملفات المنهج ومستودعات الأكواد",
];

const career = [
  "تدقيق وتحسين ملفك على LinkedIn لجذب مديري التوظيف والشركات",
  "بناء وتنسيق محفظة مشاريع GitHub لإثبات كفاءتك البرمجية",
  "جلسات توجيه مهني فردية 1-on-1 مع خبراء التكنولوجيا",
  "محاكاة المقابلات البرمجية وتدريب على مهارات التفاوض والعرض",
  "إرشاد للحصول على مشاريع العمل الحر (Freelancing) وعملاء التكنولوجيا",
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
          <span className="block text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-3">
            لماذا تختارنا في الإمارات؟
          </span>
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] mb-4 sm:mb-5">
            ما الذي يميز ذا ماستر أكاديمي الإمارات؟
          </h2>
          <p className="text-[#A6A3B0] text-xs sm:text-sm md:text-base leading-relaxed italic">
            "نحن لا نلقّن القواعد البرمجية فحسب — بل نصنع مبرمجين ومحللين واثقين ومطلوبين لسوق العمل."
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
              <span className="text-xs sm:text-sm text-[#F8F7FC] font-bold">{h}</span>
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
            <h3 className="font-bold text-xl sm:text-2xl text-[#F8F7FC] mb-5 sm:mb-6">
              تعلّم مرن يلائم وقتك والتزاماتك
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
            <h3 className="font-bold text-xl sm:text-2xl text-[#F8F7FC] mb-5 sm:mb-6">
              تسريع شامل للمسار الوظيفي والتقني
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