import type { Variants } from "motion/react";

/**
 * Shared motion vocabulary. Sections import from here rather than inventing
 * their own durations and curves, so the whole page moves as one system.
 */

export const duration = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
  reveal: 1.1,
} as const;

/** House easing — a soft decelerating curve used for nearly everything. */
export const ease = [0.16, 1, 0.3, 1] as const;

/** Snappier curve for press/hover feedback where the slow tail feels laggy. */
export const easeOut = [0.33, 1, 0.68, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease } },
};

/**
 * Parent variant for lists and grids. Children inherit `visible` and fire in
 * sequence; pair with `fadeUp` on each child.
 */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/**
 * Wipe used on section headings. The element sits inside an
 * `overflow-hidden` wrapper and slides up from behind its own mask.
 */
export const maskReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: duration.reveal, ease },
  },
};

/** Word-by-word hero headline. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -40 },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: duration.slow, ease },
  },
};

/**
 * Collapses any variant set to a plain opacity swap. Used as the
 * reduced-motion substitute so content still appears, it just does not travel.
 */
export const staticVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};
