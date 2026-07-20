import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Wraps a vertical timeline and draws its accent line downward as the section
 * scrolls through the viewport, so the track fills in as you read.
 *
 * Children supply the phases; this owns only the line.
 */
export function TimelineTrack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Start filling when the track's top reaches 80% down the viewport and
    // finish when its bottom passes the midpoint — the line stays ahead of
    // whichever phase you are currently reading.
    offset: ["start 0.8", "end 0.5"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {/* Dim full-height rail the drawn line travels over. */}
      <span className="absolute left-0 top-0 h-full w-0.5 bg-accent/15" aria-hidden="true" />
      <motion.span
        className="absolute left-0 top-0 h-full w-0.5 origin-top bg-accent"
        style={{ scaleY: reduced ? 1 : scaleY }}
        aria-hidden="true"
      />
      {/* A soft head on the leading edge of the line. */}
      {!reduced && (
        <motion.span
          className="absolute left-0 top-0 h-full w-0.5 origin-top bg-accent blur-[3px]"
          style={{ scaleY, opacity: glowOpacity }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

/**
 * One phase on the track. The marker scales in from nothing when the phase
 * arrives, which reads as the line "dropping" a node.
 */
export function TimelinePhase({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`relative pl-8 pb-8 ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
    >
      <motion.span
        className="absolute -left-[9px] top-1 h-5 w-5 rounded-full border-4 border-background bg-accent"
        variants={
          reduced
            ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
            : {
                hidden: { scale: 0, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 500, damping: 18 },
                },
              }
        }
        aria-hidden="true"
      />
      <motion.div
        variants={
          reduced
            ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
            : {
                hidden: { opacity: 0, x: 32, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
