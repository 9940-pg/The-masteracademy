import { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";

const gallery = [
  {
    id: 1,
    type: "Certificate",
    title: "Course Completion Certificate",
    subtitle: "Official verified certificate awarded to Master Academy graduates upon project completion",
    img: "/success/student-proof-1.jpg",
    badge: "Verified Certificate",
  },
  {
    id: 2,
    type: "Feedback",
    title: "Learner WhatsApp Feedback",
    subtitle: "Direct student praise for our hands-on live mentoring and project demonstrations",
    img: "/success/student-proof-2.jpg",
    badge: "WhatsApp Review",
  },
  {
    id: 3,
    type: "Feedback",
    title: "Career & Confidence Milestone",
    subtitle: "Real message from a student celebrating their rapid technical growth and clarity",
    img: "/success/student-proof-3.jpg",
    badge: "Learner Success",
  },
  {
    id: 4,
    type: "Certificate",
    title: "Live Hands-on Project Credential",
    subtitle: "Proof of practical coding, database setup, and cloud deployment mastery",
    img: "/success/student-proof-4.jpg",
    badge: "Project Showcase",
  },
  {
    id: 5,
    type: "Feedback",
    title: "Mentor Support & Guidance",
    subtitle: "Student feedback thanking our instructors for patient, 1-on-1 doubt clearing",
    img: "/success/student-proof-5.jpg",
    badge: "WhatsApp Review",
  },
  {
    id: 6,
    type: "Feedback",
    title: "First Job & Interview Success",
    subtitle: "Learners transforming from zero coding background into confident developers",
    img: "/success/student-proof-6.jpg",
    badge: "Alumni Milestone",
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
          <span className="block text-xs font-bold tracking-[2.5px] text-[#C4B5FD] uppercase mb-3">
            PROOF OF EXCELLENCE
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] break-words">
            Real Results From Real Learners
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A6A3B0] mt-3 leading-relaxed">
            Explore authentic certificates earned by our graduates and real WhatsApp messages from our thriving student community.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {gallery.map((g) => (
            <SpotlightCard
              key={g.id}
              className="border border-white/10 bg-[#15141F] rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between hover:border-[#8B5CF6]/50 transition-all duration-300"
            >
              <div onClick={() => setActiveImage(g)} className="flex flex-col h-full">
                {/* Image Container with Hover Overlay */}
                <div className="relative overflow-hidden aspect-[4/3] bg-[#110F1C]">
                  <img
                    src={g.img}
                    alt={g.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-bold text-white bg-[#8B5CF6] rounded-full px-4 py-2 shadow-lg tracking-wide">
                      Click to Expand
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-[#F8F7FC] bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    {g.badge}
                  </span>
                </div>

                {/* Card Text Content */}
                <div className="p-5 sm:p-6 flex flex-col grow justify-between">
                  <div>
                    <h3 className="font-sans font-bold text-lg text-[#F8F7FC] mb-1.5 group-hover:text-[#C4B5FD] transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-xs text-[#A6A3B0] leading-relaxed">
                      {g.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#8B5CF6] font-semibold">
                    <span>View full proof</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[92vh] bg-[#15141F] border border-white/20 rounded-2xl overflow-hidden p-5 flex flex-col items-center shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors"
            >
              ✕
            </button>

            <div className="w-full flex-1 overflow-auto flex items-center justify-center my-2 max-h-[72vh]">
              <img
                src={activeImage.img}
                alt={activeImage.title}
                className="max-w-full max-h-[72vh] rounded-xl object-contain shadow-lg"
              />
            </div>

            <div className="mt-2 w-full text-center">
              <h4 className="font-sans font-bold text-xl text-[#F8F7FC]">{activeImage.title}</h4>
              <p className="text-xs sm:text-sm text-[#A6A3B0] mt-1 max-w-lg mx-auto">{activeImage.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
