import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** How far the element may travel toward the cursor, in pixels. */
const PULL = 12;

/**
 * Pulls its child gently toward the cursor while hovered, then springs back.
 *
 * Pointer-based rather than hover-based so it no-ops on touch devices, where
 * there is no cursor to chase.
 */
export function MagneticButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  // Slight counter-scale on the pull makes it read as weight rather than drift.
  const scale = useTransform([springX, springY], ([dx, dy]: number[]) => {
    const distance = Math.hypot(dx, dy);
    return 1 + Math.min(distance / PULL, 1) * 0.03;
  });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set((offsetX / (rect.width / 2)) * PULL);
    y.set((offsetY / (rect.height / 2)) * PULL);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x: springX, y: springY, scale }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
