import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { useMemo, useState } from "react";

import { useActiveSection } from "@/hooks/use-active-section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ease } from "@/lib/motion";
import { navLinks } from "./navigation.data";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
  const reduced = useReducedMotion();
  const [condensed, setCondensed] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();

  // Smooth the raw progress so the bar glides instead of stepping per frame.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 24));

  const sectionIds = useMemo(() => navLinks.map((link) => link.href.replace("#", "")), []);
  const active = useActiveSection(sectionIds);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <motion.div
        className="mx-auto flex max-w-6xl items-center justify-between px-6"
        animate={{ height: condensed ? 56 : 64 }}
        transition={reduced ? { duration: 0 } : { duration: 0.35, ease }}
      >
        <a href="#top" className="font-mono text-sm font-medium tracking-tighter">
          ENDURANCE MATHEW
        </a>
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-8 text-xs font-medium uppercase tracking-widest text-muted-foreground md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative py-1 transition-colors hover:text-foreground ${
                    isActive ? "text-foreground" : ""
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      // Shared layoutId slides one underline between links
                      // instead of cross-fading four separate ones.
                      layoutId="nav-active-underline"
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-accent"
                      transition={
                        reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                </a>
              );
            })}
          </div>
          <ThemeToggle />
        </div>
      </motion.div>

      <motion.div
        className="h-px origin-left bg-accent"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
        aria-hidden="true"
      />
    </nav>
  );
}
