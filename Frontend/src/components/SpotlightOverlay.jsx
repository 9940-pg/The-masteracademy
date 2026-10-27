import { useEffect, useRef, useState } from "react";

// Full-page "spotlight reveal": dims the background and illuminates
// a soft circle of full brightness around the cursor with a violet glow.
export default function SpotlightOverlay() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Disable on touch screens so mobile users have a clear view without a mouse
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const el = ref.current;
    const onMove = (e) => {
      if (!el) return;
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
      setActive((prev) => (prev ? prev : true));
    };
    const onLeave = () => setActive(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] transition-opacity duration-500 hidden md:block"
      style={{
        opacity: active ? 1 : 0,
        background:
          "radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(139,92,246,0.18), transparent 55%), rgba(6,5,10,0.5)",
        WebkitMaskImage:
          "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), transparent 0%, transparent 45%, black 85%)",
        maskImage:
          "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), transparent 0%, transparent 45%, black 85%)",
      }}
    />
  );
}