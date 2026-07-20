import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { maskReveal, staticVariants } from "@/lib/motion";

/**
 * Slides a line of text up from behind its own mask. Used on section headings.
 *
 * The outer element clips; the inner one travels. Keep the text to a single
 * line per instance — a wrapped paragraph would reveal as one block and lose
 * the effect.
 */
export function MaskedText({
  children,
  className,
  as = "span",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.span;

  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <MotionTag
        className={className}
        style={{ display: "block" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay }}
        variants={reduced ? staticVariants : maskReveal}
      >
        {children}
      </MotionTag>
    </span>
  );
}
