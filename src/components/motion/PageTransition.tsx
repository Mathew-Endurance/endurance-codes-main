import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ease } from "@/lib/motion";

/**
 * Enter transition for a routed page, so navigating in from the index does not
 * hard-cut.
 *
 * Enter-only by design: TanStack Router unmounts the outgoing route before the
 * next one mounts, so an exit animation here would never get a chance to play.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.01 : 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}
