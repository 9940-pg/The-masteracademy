import { useEffect, useRef } from "react";

// Ambient glow that follows the cursor across the whole page
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

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
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-500 hidden md:block"
      style={{
        background:
          "radial-gradient(650px circle at var(--x, 50%) var(--y, 50%), rgba(139,92,246,0.12), transparent 60%)",
      }}
    />
  );
}
