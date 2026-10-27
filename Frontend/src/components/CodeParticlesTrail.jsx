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
  "::",
  "/* */",
  "$",
];

// Aesthetic glowing purple, lavender & violet shades
const PURPLE_COLORS = [
  "rgba(168, 85, 247, ",  // Violet / Purple #a855f7
  "rgba(196, 181, 253, ", // Soft lavender #c4b5fd
  "rgba(139, 92, 246, ",  // Brand purple #8b5cf6
  "rgba(217, 70, 239, ",  // Fuchsia #d946ef
  "rgba(232, 121, 249, ", // Orchid #e879f9
  "rgba(192, 132, 252, ", // Purple-400 #c084fc
];

export default function CodeParticlesTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on mobile/touch screens for 100% battery & scrolling performance
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = null;
    let isRunning = false;
    let particles = [];
    let lastX = -100;
    let lastY = -100;

    // Handle high-DPI displays with exact pixel ratio (capped at 2 for performance)
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create a delicate particle with varied, small sizes
    const createParticle = (x, y) => {
      // Hard cap active particles to 8 max for ultra-lightweight performance
      if (particles.length >= 8) {
        particles.shift();
      }

      const symbol = SYNTAX_SYMBOLS[Math.floor(Math.random() * SYNTAX_SYMBOLS.length)];
      const baseColor = PURPLE_COLORS[Math.floor(Math.random() * PURPLE_COLORS.length)];
      // Varied small sizes: 7px to 12px (delicate, subtle, noticeably varied)
      const fontSize = Math.floor(Math.random() * 6) + 7;

      particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -Math.random() * 0.8 - 0.2, // Subtle upward drift
        rotation: (Math.random() - 0.5) * 0.25,
        vRot: (Math.random() - 0.5) * 0.01,
        symbol,
        baseColor,
        fontSize,
        alpha: 0.85,
        life: 0,
        maxLife: Math.floor(Math.random() * 14) + 20, // 20 - 34 frames (~0.35s - 0.55s)
      });
    };

    // 60FPS Render loop with auto-sleep when idle (0% CPU when mouse stops)
    const render = () => {
      if (particles.length === 0) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        isRunning = false;
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha = Math.max(0, 0.85 * (1 - p.life / p.maxLife));

        if (p.alpha <= 0 || p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Crisp render without heavy shadow blur to guarantee silky 60-120fps
        ctx.fillStyle = `${p.baseColor}${p.alpha})`;
        ctx.font = `600 ${p.fontSize}px 'JetBrains Mono', 'Fira Code', Consolas, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const onMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const dist = Math.hypot(dx, dy);

      // Decreased quantity: only spawn 1 delicate particle every ~50px of cursor travel
      if (dist > 50) {
        createParticle(currentX, currentY);
        lastX = currentX;
        lastY = currentY;
        startLoop();
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
