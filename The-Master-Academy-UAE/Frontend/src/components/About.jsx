import SpotlightCard from "./SpotlightCard";

const pillars = [
  "تدريب عملي تطبيقي 100%",
  "بناء ثقة برمجية حقيقية",
  "جاهزية تامة لسوق دبي والإمارات",
  "إرشاد وتوجيه مهني فردي",
  "حصص تفاعلية مباشرة عبر زووم",
  "دعم مستمر لمجتمع الخريجين",
];

const features = [
  {
    n: "01",
    title: "تطبيق عملي من الصفر",
    copy: "بناء تطبيقات ومشاريع حقيقية وكتابة كود نظيف وفق أعلى المعايير مع مراجعات دقيقة من المدربين.",
  },
  {
    n: "02",
    title: "حصص تفاعلية عبر زووم",
    copy: "تواصل مباشر وحي مع المحاضر، مع إمكانية مشاركة الشاشة والإجابة على استفساراتك البرمجية لحظياً.",
  },
  {
    n: "03",
    title: "دمج الذكاء الاصطناعي",
    copy: "تعلم توظيف أدوات الذكاء الاصطناعي التوليدي وواجهات LLMs لتسريع بناء وتطوير المشاريع بـ 10 أضعاف.",
  },
  {
    n: "04",
    title: "توجيه وتأهيل لسوق العمل",
    copy: "مراجعة السيرة الذاتية، وتحسين ملف LinkedIn، وتنسيق حساب GitHub، ومحاكاة المقابلات التقنية لشركات الإمارات.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20 items-center">
        <div>
          <span className="inline-block text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-3">
            عن ذا ماستر أكاديمي الإمارات
          </span>
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-[38px] leading-[1.2] text-[#F8F7FC] mb-4 sm:mb-5">
            تمكين الجيل القادم من قادة التكنولوجيا والذكاء الاصطناعي
          </h2>
          <p className="text-[#D5D3DC] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-3.5 sm:mb-4 font-normal">
            ذا ماستر أكاديمي هي منصة تعليمية وتدريبية متخصصة صُممت لمساعدة الطلاب، والمبتدئين، والمحترفين في دولة الإمارات على بناء مهارات تقنية تطبيقية مطلوبة عالمياً ومحلياً.
          </p>
          <p className="text-[#A6A3B0] text-xs sm:text-sm leading-relaxed mb-6">
            نحن لا نؤمن بالمحاضرات النظرية المملة. كل مفهوم برمجي يقترن مباشرة بكتابة كود حي، ونشر المشاريع على السحابة، وبناء محفظة أعمال (Portfolio) تثبت كفاءتك أمام مسؤولي التوظيف والعملاء في دبي والمنطقة.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {pillars.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-2 text-xs md:text-sm text-[#D5D3DC] bg-[#15141F] border border-white/10 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 hover:border-[#8B5CF6]/50 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6]" />
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Visual feature box */}
        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((f, idx) => (
            <SpotlightCard key={f.n} delay={idx * 100} className="bg-[#15141F] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center text-[#C4B5FD] font-bold text-lg mb-4">
                {f.n}
              </div>
              <h3 className="font-bold text-lg text-[#F8F7FC] mb-2">{f.title}</h3>
              <p className="text-xs text-[#A6A3B0] leading-relaxed">{f.copy}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}