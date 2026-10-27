import SpotlightCard from "./SpotlightCard";

const audience = [
  {
    title: "المبتدئون تماماً من الصفر",
    desc: "ابدأ رحلتك بدون أي قلق أو خوف من البرمجة، وتعلّم خطوة بخطوة بإرشاد مدربين محترفين وصبورين.",
  },
  {
    title: "طلاب وخريجو الجامعات",
    desc: "ردم الفجوة بين النظريات الأكاديمية والواقع العملي للشركات عبر بناء محفظة مشاريع برمجية حقيقية.",
  },
  {
    title: "الراغبون في تغيير مسارهم المهني",
    desc: "التحول بسلاسة وثقة من أي تخصص سابق إلى مجالات هندسة البرمجيات والذكاء الاصطناعي الواعدة.",
  },
  {
    title: "الباحثون عن وظائف في الإمارات",
    desc: "التميّز في المقابلات التقنية الصعبة في دبي وأبوظبي بمشاريع حية موثقة وكفاءة تواصل عالية.",
  },
  {
    title: "الموظفون والمهنيون التقنيون",
    desc: "ترقية مهاراتك سريعاً في أدوات الذكاء الاصطناعي، وأتمتة بايثون، وسحابة AWS لنيل الترقيات وعلاوات الرواتب.",
  },
  {
    title: "رواد الأعمال وأصحاب المشاريع الحرة",
    desc: "بناء النماذج الرقمية الأولية (MVPs)، وأتمتة أعمال شركتك، وتقديم خدمات برمجة الويب لعملائك باستقلالية.",
  },
];

export default function Audience() {
  return (
    <section className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-12 sm:mb-14">
          <span className="block text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-3">
            لمن صُممت هذه البرامج؟
          </span>
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] break-words">
            هل تناسبك برامج ذا ماستر أكاديمي؟
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A6A3B0] mt-3 leading-relaxed">
            سواء كنت لم تكتب سطراً برمجياً من قبل أو تسعى لاحتراف الذكاء الاصطناعي والحوسبة السحابية، لدينا المسار المنظم الذي يوصلك لهدفك.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {audience.map((a, idx) => (
            <SpotlightCard
              key={a.title}
              delay={(idx % 3) * 100}
              className="bg-[#15141F] border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center shrink-0 text-[#C4B5FD]">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.2]">
                    <circle cx="12" cy="12" r="9" className="opacity-25" />
                    <path d="M8 12.5l2.5 2.5L16 9.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#F8F7FC] mb-2">{a.title}</h3>
                  <p className="text-xs sm:text-sm text-[#A6A3B0] leading-relaxed">{a.desc}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
