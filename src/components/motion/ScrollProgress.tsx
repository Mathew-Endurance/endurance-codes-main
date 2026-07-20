import { motion, useScroll, useSpring } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Page-level reading progress bar. Long-form pages (case studies) use this to
 * show how much is left.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      className={`h-px origin-left bg-accent ${className ?? ""}`}
      style={{ scaleX: reduced ? scrollYProgress : smoothed }}
      aria-hidden="true"
    />
  );
}
