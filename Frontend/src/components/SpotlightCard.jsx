import { useEffect, useRef, useState } from "react";

// Scroll-reveal card wrapper:
// As the user scrolls down, or when the website opens,
// cards smoothly animate into view with a silky fade-in-up effect.
export default function SpotlightCard({
  children,
  className = "",
  delay = 0,
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is not supported or reduced motion requested, show immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
      className={`relative transform transition-all duration-700 ease-out will-change-transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-[0.98]"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
