import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeUp, staticVariants, stagger } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Render as something other than a div (e.g. "section", "article"). */
  as?: ElementType;
  /** Seconds to wait before starting. */
  delay?: number;
  /** Fraction of the element that must be visible before firing. */
  amount?: number;
  variants?: Variants;
};

/**
 * Fades and lifts its children into view once, the first time they scroll in.
 * Under reduced motion it degrades to a plain opacity swap.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  amount = 0.25,
  variants = fadeUp,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      variants={reduced ? staticVariants : variants}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Gap between each child, in seconds. */
  each?: number;
  delay?: number;
  amount?: number;
};

/**
 * Parent for lists and grids: reveals children in sequence. Wrap each child in
 * `<RevealItem>`.
 */
export function StaggerGroup({
  children,
  className,
  as = "div",
  each = 0.08,
  delay = 0,
  amount = 0.2,
}: StaggerProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={reduced ? staticVariants : stagger(each, delay)}
    >
      {children}
    </MotionTag>
  );
}

/** A single child of `<StaggerGroup>`. Inherits the parent's timing. */
export function RevealItem({
  children,
  className,
  as = "div",
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variants?: Variants;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag className={className} variants={reduced ? staticVariants : variants}>
      {children}
    </MotionTag>
  );
}
