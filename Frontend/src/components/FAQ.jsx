import { useState } from "react";

const faqs = [
  {
    q: "Who is eligible to join Master Academy courses?",
    a: "Anyone! Whether you are a college student, job seeker, working professional, or an absolute beginner with zero coding background, our courses start from core fundamentals and progress toward advanced hands-on applications.",
  },
  {
    q: "What happens if I miss a live Zoom class?",
    a: "Don't worry! All live sessions are recorded in Full HD and uploaded to your student portal within 24 hours. You have lifetime access to rewatch sessions, review slide decks, and access the source code anytime.",
  },
  {
    q: "Do I need prior coding knowledge?",
    a: "No prior experience is needed for our beginner-friendly tracks. We teach step-by-step from installing software to writing your first lines of code and deploying projects on the cloud.",
  },
  {
    q: "Will I receive a certificate of completion?",
    a: "Yes! Upon successfully attending sessions and completing the assigned projects, you will receive an official, verifiable Master Academy Course Completion Certificate that you can showcase on LinkedIn and your resume.",
  },
  {
    q: "What is the difference between Crash Courses and Full Programs?",
    a: "Crash courses (2 Hours, ₹499) are intensive live workshops designed to give you a quick, practical overview and live demo of a technology. Full Flagship Programs (12 Weeks, 48 Hours) are comprehensive career bootcamps with 5+ industry projects, 1-on-1 mentorship, resume reviews, and placement assistance.",
  },
  {
    q: "How are doubts and questions resolved?",
    a: "You can ask questions live during Zoom classes with screen sharing. Additionally, you gain access to our private WhatsApp and Discord community where trainers and peers answer questions 24/7.",
  },
  {
    q: "Are installment payment options available?",
    a: "Yes, for our 12-week flagship programs, we offer flexible installment payment schedules to make high-quality tech education accessible. Contact our admissions team on WhatsApp for customized plans.",
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
          <span className="block text-xs font-bold tracking-[2.5px] text-[#C4B5FD] uppercase mb-3">
            HAVE QUESTIONS?
          </span>
          <h2 className="font-[Manrope] font-extrabold text-xl sm:text-2xl md:text-[32px] leading-[1.15] text-[#F8F7FC]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-xs md:text-sm text-[#A6A3B0] mt-3 leading-relaxed">
            Everything you need to know about our courses, live sessions, certification, and career support.
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
                  <span className="font-[Manrope] font-bold text-sm sm:text-sm md:text-base text-[#F8F7FC] leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[#C4B5FD] transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#8B5CF6]/20" : ""
                      }`}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {/* Grid-rows trick: content always mounted, height animates via
                    0fr -> 1fr instead of instant mount/unmount. */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-xs md:text-sm text-[#A6A3B0] leading-relaxed border-t border-white/5">
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
            <h4 className="font-[Manrope] font-bold text-sm text-[#F8F7FC]">Still have questions?</h4>
            <p className="text-xs text-[#A6A3B0] mt-0.5">Our admissions counselors are available on WhatsApp to guide you.</p>
          </div>
          <a
            href="https://wa.me/919325719765?text=Hi%20Master%20Academy,%20I%20have%20a%20few%20questions%20regarding%20the%20courses."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:opacity-90 px-6 py-3 rounded-full transition-all shrink-0 shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:scale-105 w-full sm:w-auto text-center"
          >
            Chat with an Advisor
          </a>
        </div>
      </div>
    </section>
  );
}