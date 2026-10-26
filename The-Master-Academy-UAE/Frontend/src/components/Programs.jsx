import SpotlightCard from "./SpotlightCard";

const areas = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C4B5FD] fill-none stroke-current stroke-2">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    title: "البرمجة والذكاء الاصطناعي",
    copy: "تعلّم أكثر المهارات طلباً: لغة بايثون، أدوات الذكاء الاصطناعي التوليدي، وتطوير تطبيقات الويب السريعة ونشرها على السحابة عبر مشاريع واقعية حية.",
    topics: ["أساسيات بايثون", "جافاسكريبت الحديثة", "واجهات الذكاء الاصطناعي", "قواعد البيانات والسحابة"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C4B5FD] fill-none stroke-current stroke-2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "مهارات التواصل التقني",
    copy: "إتقان التعبير الاحترافي، وعرض أفكارك البرمجية بوضوح وثقة أمام مسؤولي التوظيف والعملاء وفرق العمل متعددة الجنسيات في دبي.",
    topics: ["التواصل مع العملاء", "عروض المشاريع التقنية", "المراسلات الاحترافية", "بيئة العمل التقنية"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C4B5FD] fill-none stroke-current stroke-2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "بناء الثقة وتخطي المخاوف",
    copy: "التخلص من الرهبة البرمجية ومتلازمة المحتال. بناء ثقة صلبة تمكنك من اجتياز المقابلات التقنية الصعبة والتحدث بكل راحة عن مشاريعك.",
    topics: ["التحدث الاحترافي", "عقلية المقابلات", "حل المشكلات المعقدة", "إبراز القيمة الشخصية"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C4B5FD] fill-none stroke-current stroke-2">
        <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    title: "التأهيل لسوق العمل الإماراتي",
    copy: "إرشاد مخصص لبناء سيرة ذاتية متوافقة مع أنظمة ATS، وإنشاء حساب GitHub متميز، وضبط ملف LinkedIn لجذب مسؤولي التوظيف في الإمارات.",
    topics: ["بورتفوليو GitHub", "صياغة السيرة الذاتية", "محاكاة المقابلات", "التفاوض على العقود"],
  },
];

export default function Programs() {
  return (
    <section id="programs" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-12 sm:mb-14">
          <span className="block text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-3">
            ماذا نُدرّس
          </span>
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] break-words">
            ركائز التدريب الأساسية بالأكاديمية
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A6A3B0] mt-3 sm:mt-4 leading-relaxed">
            منهج تدريبي شامل مصمم خصيصاً لتحويلك إلى مبرمج محترف، واثق، وجاهز للتوظيف الفوري.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {areas.map((a) => (
            <SpotlightCard
              key={a.title}
              className="rounded-2xl bg-[#15141F] border border-white/10 p-5 sm:p-7 flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  {a.icon}
                </div>
                <h3 className="text-[#F8F7FC] text-xl font-bold mb-3">{a.title}</h3>
                <p className="text-[#A6A3B0] text-sm leading-relaxed mb-6">{a.copy}</p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="text-[11px] font-bold text-[#C4B5FD] uppercase tracking-wider mb-2">محاور التركيز:</div>
                <div className="flex flex-wrap gap-1.5">
                  {a.topics.map((t) => (
                    <span key={t} className="text-[11px] text-[#D5D3DC] bg-white/[0.04] px-2.5 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
