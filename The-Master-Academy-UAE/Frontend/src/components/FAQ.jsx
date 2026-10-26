import { useState } from "react";

const faqs = [
  {
    q: "من المؤهل للالتحاق بدورات ذا ماستر أكاديمي في الإمارات؟",
    a: "الجميع مؤهل! سواء كنت طالباً جامعياً، أو باحثاً عن عمل في دبي وأبوظبي، أو موظفاً تسعى لترقية مهاراتك، أو مبتدئاً دون أي خبرة برمجية سابقة، تبدأ مساراتنا من الصفر تماماً وتتدرج عملياً حتى الاحتراف.",
  },
  {
    q: "ماذا يحدث إذا فاتتني إحدى الحصص المباشرة عبر زووم؟",
    a: "لا تقلق إطلاقاً! يتم تسجيل جميع الجلسات المباشرة بجودة Full HD ورفعها خلال 24 ساعة، مع إمكانية الوصول غير المحدود مدى الحياة لمشاهدة التسجيلات وتحميل ملفات الكود في أي وقت.",
  },
  {
    q: "هل أحتاج إلى خبرة أو معرفة مسبقة بالبرمجة؟",
    a: "لا تشترط أي معرفة برمجية مسبقة لمسارات المبتدئين. نبدأ معك خطوة بخطوة من تحميل البرامج وكتابة أول سطر كود حتى تشغيل مشاريعك الحقيقية على السحابة.",
  },
  {
    q: "هل أحصل على شهادة إتمام معتمدة؟",
    a: "نعم! بعد حضور الحصص وإنجاز المشاريع المحددة في الدورة، ستحصل على شهادة رقمية رسمية موثقة من ذا ماستر أكاديمي الإمارات لإضافتها لسيرتك الذاتية وحسابك في LinkedIn.",
  },
  {
    q: "ما الفرق بين الدورات المكثفة وبرامج الـ 12 أسبوعاً؟",
    a: "الدورات المكثفة (ساعتان — 49 د.إ) هي ورش عمل سريعة وعملية تمنحك تجربة حية وتطبيقاً مباشراً في تقنية معينة. بينما برامج الـ 12 أسبوعاً الاحترافية هي مسرعات مهنية شاملة تتضمن 5+ مشاريع بورتفوليو، وإرشاداً مهنياً فردياً، وتجهيزاً كاملاً لسوق العمل.",
  },
  {
    q: "كيف تتم الإجابة عن الأسئلة وحل المشكلات البرمجية؟",
    a: "يمكنك طرح أسئلتك مباشرة أثناء الحصص عبر زووم مع مشاركة الشاشة لتصحيح الكود معك لحظياً. كما يتوفر مجتمع واتساب خاص بالدفعة للمتابعة وحل الأسئلة على مدار الساعة.",
  },
  {
    q: "هل تتوفر خطط دفع بالتقسيط بالدرهم الإماراتي؟",
    a: "نعم، بالنسبة لبرامج الـ 12 أسبوعاً الاحترافية، نوفر خطط تقسيط شهرية ميسرة بالدرهم الإماراتي (AED) بدون أي فوائد. تواصل مع فريق القبول عبر واتساب لترتيب خطة الدفع المناسبة لك.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
          <span className="block text-xs font-bold tracking-[2px] text-[#C4B5FD] uppercase mb-3">
            هل لديك استفسارات؟
          </span>
          <h2 className="font-extrabold text-xl sm:text-2xl md:text-[32px] leading-[1.15] text-[#F8F7FC]">
            الأسئلة الأكثر شيوعاً
          </h2>
          <p className="text-xs sm:text-xs md:text-sm text-[#A6A3B0] mt-3 leading-relaxed">
            كل ما تود معرفته عن دوراتنا، والحصص المباشرة، والشهادات، وخطط السداد بالدرهم الإماراتي.
          </p>
        </div>

        <div className="space-y-3.5 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-[#15141F] border border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 hover:border-[#8B5CF6]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none focus-visible:bg-white/[0.04]"
                >
                  <span className="font-bold text-sm sm:text-sm md:text-base text-[#F8F7FC] leading-snug text-right">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[#C4B5FD] transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#8B5CF6]/20" : ""
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-[#A6A3B0] leading-relaxed border-t border-white/5 text-right">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 sm:mt-12 bg-[#15141F]/60 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-sm text-[#F8F7FC]">هل ما زال لديك أي استفسار آخر؟</h4>
            <p className="text-xs text-[#A6A3B0] mt-0.5">مستشارو القبول متاحون على مدار الساعة عبر واتساب لمساعدتك.</p>
          </div>
          <a
            href="https://wa.me/919325719765?text=مرحباً%20ذا%20ماستر%20أكاديمي%20الإمارات،%20أود%20الاستفسار%20عن%20تفاصيل%20الدورات%20والتسجيل."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:opacity-90 px-6 py-3 rounded-full transition-all shrink-0 shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:scale-105 w-full sm:w-auto text-center"
          >
            تحدث مع مستشار القبول
          </a>
        </div>
      </div>
    </section>
  );
}