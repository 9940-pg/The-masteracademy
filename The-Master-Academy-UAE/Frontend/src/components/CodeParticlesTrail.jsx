import { useEffect, useRef } from "react";

// Coding syntax symbols to spawn around cursor
const SYNTAX_SYMBOLS = [
  "<>",
  "</>",
  "{}",
  "[]",
  ";",
  "!",
  "=>",
  "//",
  "()",
  "&&",
  "++",
  "==",
  "::",
  "/>",
  "{;}",
];

// Aesthetic purple & violet palette
const PURPLE_COLORS = [
  "rgba(168, 85, 247, ", // Violet/Purple bright
  "rgba(196, 181, 253, ", // Lavender soft
  "rgba(139, 92, 246, ", // Brand Accent #8B5CF6
  "rgba(217, 70, 239, ", // Neon Fuchsia
  "rgba(232, 121, 249, ", // Glowing Orchid
];

export default function CodeParticlesTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on mobile/touch screens for maximum performance
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    // Handle high-DPI displays
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create a particle at (x, y)
    const createParticle = (x, y) => {
      const symbol = SYNTAX_SYMBOLS[Math.floor(Math.random() * SYNTAX_SYMBOLS.length)];
      const baseColor = PURPLE_COLORS[Math.floor(Math.random() * PURPLE_COLORS.length)];
      const fontSize = Math.floor(Math.random() * 6) + 12; // 12px to 18px

      particles.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 14,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -Math.random() * 1.6 - 0.4, // Gentle upward float
        rotation: (Math.random() - 0.5) * 0.4,
        vRot: (Math.random() - 0.5) * 0.02,
        symbol,
        baseColor,
        fontSize,
        alpha: 1,
        life: 0,
        maxLife: Math.floor(Math.random() * 25) + 35, // ~35-60 frames (approx 0.6s - 1.0s)
      });
    };

    const onMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const now = performance.now();

      // Calculate distance moved from last point
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const dist = Math.hypot(dx, dy);

      // Spawn particles if cursor moved enough or sufficient time passed
      if (dist > 18 || (dist > 6 && now - lastTime > 40)) {
        // Spawn 1 to 2 particles per step
        const count = dist > 40 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          createParticle(currentX, currentY);
        }
        lastX = currentX;
        lastY = currentY;
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Animation loop (60 FPS)
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.alpha <= 0 || p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Neon Glow
        ctx.shadowColor = `${p.baseColor}0.85)`;
        ctx.shadowBlur = 10;
        ctx.fillStyle = `${p.baseColor}${p.alpha})`;
        ctx.font = `600 ${p.fontSize}px 'JetBrains Mono', 'Fira Code', Consolas, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden md:block"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
