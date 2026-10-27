import { useState } from "react";
import SpotlightCard from "./SpotlightCard";
import CourseDetailModal from "./CourseDetailModal";
import { crashCourses, fullCourses } from "../data/coursesData";

export default function Courses({ onSelectCourse }) {
  const [tab, setTab] = useState("crash");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpenDetail = (course) => {
    setSelectedCourse(course);
  };

  const handleSelectForContact = (courseTitle) => {
    if (onSelectCourse) onSelectCourse(courseTitle);
    const contactSec = document.getElementById("contact");
    if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="courses" className="bg-[#0B0A12] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-28 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-xl">
            <span className="block text-xs font-bold tracking-[2.5px] text-[#C4B5FD] uppercase mb-3">
              EXPLORE OUR PROGRAMS
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] text-[#F8F7FC] break-words">
              Pick Your Learning Path
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#A6A3B0] mt-3 leading-relaxed">
              Choose between fast-paced 2-hour crash courses or comprehensive 12-week career accelerator programs.
            </p>
          </div>

          <div className="flex max-w-full bg-[#15141F] border border-white/10 rounded-full p-1 sm:p-1.5 self-start md:self-auto shadow-inner overflow-x-auto">
            <button
              type="button"
              onClick={() => setTab("crash")}
              className={`px-3.5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-300 ${
                tab === "crash"
                  ? "bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white shadow-[0_4px_16px_rgba(139,92,246,0.35)]"
                  : "text-[#A6A3B0] hover:text-white"
              }`}
            >
              Crash Courses (₹499)
            </button>
            <button
              type="button"
              onClick={() => setTab("full")}
              className={`px-3.5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-300 ${
                tab === "full"
                  ? "bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white shadow-[0_4px_16px_rgba(139,92,246,0.35)]"
                  : "text-[#A6A3B0] hover:text-white"
              }`}
            >
              12-Week Programs
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(tab === "crash" ? crashCourses : fullCourses).map((c) => (
            <SpotlightCard
              key={c.id}
              className="rounded-2xl bg-[#15141F] border border-white/10 p-5 sm:p-7 flex flex-col h-full hover:border-[#8B5CF6]/50 transition-all duration-300"
            >
              {/* Badge & Mode */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex text-[11px] font-bold tracking-wide text-[#C4B5FD] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 rounded-full px-3 py-1">
                  {tab === "full" ? c.status : "CRASH COURSE"}
                </span>
                <span className="text-[11px] text-[#A6A3B0] font-medium">
                  {c.duration}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-sans font-bold text-xl text-[#F8F7FC] leading-snug mb-3">
                {c.title}
              </h3>

              {/* Timings / Schedule */}
              <div className="text-xs text-[#A6A3B0] mb-5 bg-[#1B1A28] border border-white/5 rounded-xl p-3 flex flex-col gap-1">
                {tab === "full" ? (
                  <>
                    <span className="text-[#D5D3DC] font-semibold">{c.classes}</span>
                    <span>{c.mode} · {c.level}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#D5D3DC] font-semibold">{c.date}</span>
                    <span>{c.mode}</span>
                  </>
                )}
              </div>

              {/* Learning Highlights */}
              <p className="text-[11px] font-bold tracking-[1.5px] text-[#C4B5FD] uppercase mb-3">
                WHAT YOU WILL LEARN
              </p>
              <ul className="flex flex-col gap-2.5 mb-6">
                {c.learn.slice(0, 4).map((l) => (
                  <li key={l} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D5D3DC] leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
                {c.learn.length > 4 && (
                  <li className="text-xs text-[#8B5CF6] font-medium pl-4">
                    + {c.learn.length - 4} more topics in full syllabus...
                  </li>
                )}
              </ul>

              {/* Perks Checklist */}
              <ul className="flex flex-col gap-1.5 mb-6 pb-6 border-b border-white/10 mt-auto">
                {c.perks.slice(0, 2).map((p) => (
                  <li key={p} className="text-xs text-[#9C99A8] flex items-center gap-1.5">
                    <span className="text-[#22C55E]">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {/* Price & Action */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <div>
                  <span className="font-sans font-extrabold text-2xl text-[#F8F7FC]">
                    {c.price}
                  </span>
                  {c.priceNote && (
                    <span className="text-[11px] text-[#A6A3B0] block">
                      {c.priceNote}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenDetail(c)}
                  className="text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:opacity-95 hover:shadow-[0_4px_16px_rgba(139,92,246,0.35)] rounded-full px-4 sm:px-5 py-2.5 transition-all shrink-0"
                >
                  View Details
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={Boolean(selectedCourse)}
        onClose={() => setSelectedCourse(null)}
        onSelectForContact={handleSelectForContact}
      />
    </section>
  );
}
