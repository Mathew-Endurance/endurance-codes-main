import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

/** Distance within which two nodes get connected by a line. */
const LINK_DISTANCE = 130;
/** Radius around the cursor that pushes nodes away. */
const POINTER_RADIUS = 150;
/** One particle per this many square pixels, so density is resolution-independent. */
const AREA_PER_PARTICLE = 14000;
const MAX_PARTICLES = 110;

/**
 * Canvas node field behind the hero. Nodes drift, link to nearby neighbours,
 * and scatter away from the cursor.
 *
 * Cost control: particle count scales with viewport area and is capped; the
 * loop stops entirely when the hero scrolls out of view or the tab is hidden.
 * Renders nothing under `prefers-reduced-motion`.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999 };

    // Read the theme's accent colour so the field follows light/dark.
    const inkColor = () => {
      const styles = getComputedStyle(canvas);
      return styles.getPropertyValue("color").trim() || "rgb(148,163,184)";
    };
    let ink = "rgb(148,163,184)";

    const seed = () => {
      const target = Math.min(MAX_PARTICLES, Math.round((width * height) / AREA_PER_PARTICLE));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ink = inkColor();
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around the edges so the field never thins out.
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Push away from the cursor.
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < POINTER_RADIUS * POINTER_RADIUS && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const push = (1 - dist / POINTER_RADIUS) * 1.6;
          p.x += (dx / dist) * push;
          p.y += (dy / dist) * push;
        }
      }

      // Links first, so nodes sit on top of them.
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > LINK_DISTANCE * LINK_DISTANCE) continue;

          const alpha = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * 0.28;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = ink;
      for (const p of particles) {
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(draw);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Only run while the hero is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      // `currentColor` is sampled in the draw loop, so the field tracks the theme.
      style={{ color: "var(--color-accent, rgb(148,163,184))" }}
    />
  );
}
