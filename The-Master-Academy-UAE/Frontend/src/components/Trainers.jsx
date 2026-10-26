import SpotlightCard from "./SpotlightCard";

const mentors = [
  {
    name: "أشويني",
    title: "كبيرة مدربي بايثون والذكاء الاصطناعي",
    experience: "+6 سنوات خبرة تقنية",
    bio: "متخصصة في برمجة بايثون، وتعلّم الآلة، وأتمتة مسارات العمل بالذكاء الاصطناعي. شغوفة بمساعدة المبتدئين على كتابة كود نظيف وتطوير مشاريع ذكاء اصطناعي عملية.",
    skills: ["بايثون", "واجهات OpenAI", "تحليل البيانات Pandas", "الأتمتة الذكية", "أدوات الذكاء الاصطناعي"],
    image: `${import.meta.env.BASE_URL}trainer-ashwini.jpg`,
    initials: "أ",
  },
  {
    name: "عنبرين",
    title: "كبيرة مهندسي تطوير الويب Full-Stack",
    experience: "+5 سنوات خبرة تقنية",
    bio: "شغوفة بتقنيات الويب العصرية وبنية المكونات التفاعلية. تُعلّم المتدربين كيفية تحويل الأفكار الرقمية إلى تطبيقات سحابية حية ومتجاوبة بسهولة واحتراف.",
    skills: ["React.js", "جافاسكريبت ES6+", "Tailwind CSS", "واجهات REST APIs", "أنظمة Git"],
    image: `${import.meta.env.BASE_URL}trainer-ambreen.jpg`,
    initials: "ع",
  },
  {
    name: "نخبة مهندسي السحابة و DevOps",
    title: "مهندسون معتمدون من أمازون AWS",
    experience: "ممارسون وخبراء في سوق دبي والخليج",
    bio: "مهندسو سحابة ميدانيون يديرون بنى تحتية عملاقة للشركات. يرشدون المتدربين عبر شبكات AWS VPCs، وحاويات Docker، وخطوط الإنتاج المؤتمتة CI/CD.",
    skills: ["AWS EC2 & S3", "حاويات Docker", "إدارة أنظمة Linux", "خطوط إنتاج CI/CD", "هندسة DevOps"],
    image: `${import.meta.env.BASE_URL}trainer-aws.jpg`,
    initials: "س",
  },
];

export default function Trainers() {
  return (
    <section id="trainers" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <span className="block text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-3">
            إشراف وتوجيه من كبار الخبراء
          </span>
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] break-words">
            تعلّم مباشرة من ممارسين وكبار مهندسي التكنولوجيا
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A6A3B0] mt-3 leading-relaxed">
            مدربونا هم مهندسون ممارسون ذوو خبرة ميدانية طويلة وشغف بالتعليم، يرافقونك خطوة بخطوة عبر مراجعات الكود الحية والتوجيه المهني المخصص.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((m) => (
            <SpotlightCard
              key={m.name}
              className="rounded-2xl bg-[#15141F] border border-white/10 p-5 sm:p-6 flex flex-col justify-between hover:border-[#8B5CF6]/50 transition-all duration-300 group"
            >
              <div>
                {/* Mentor Photo Container */}
                <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden mb-5 bg-[#0F0E17] border border-white/5">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15141F] via-[#15141F]/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#E9D5FF] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      {m.experience}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      مدرب معتمد
                    </span>
                  </div>
                </div>

                {/* Header Info */}
                <div className="mb-4">
                  <h3 className="font-bold text-xl text-[#F8F7FC]">{m.name}</h3>
                  <p className="text-xs text-[#C4B5FD] font-semibold mt-0.5">{m.title}</p>
                </div>

                <p className="text-xs sm:text-sm text-[#A6A3B0] leading-relaxed mb-6">
                  "{m.bio}"
                </p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="text-[11px] font-bold text-[#C4B5FD] uppercase tracking-wider mb-2">
                  مجالات التخصص:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {m.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] text-[#D5D3DC] bg-white/[0.04] border border-white/5 px-2.5 py-1 rounded-md"
                    >
                      {s}
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
