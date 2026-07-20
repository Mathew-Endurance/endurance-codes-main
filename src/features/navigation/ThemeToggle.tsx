import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ease } from "@/lib/motion";

type Theme = "light" | "dark";

// The app renders <html class="dark"> on the server, so "dark" is the default
// until the client reads a previously saved preference.
function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const reduced = useReducedMotion();

  // Sync from localStorage after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";

  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <motion.button
      type="button"
      aria-label={`Switch to ${next} mode`}
      onClick={() => setTheme(next)}
      whileTap={reduced ? undefined : { scale: 0.88 }}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
    >
      {/* The outgoing icon rotates out as the incoming one rotates in. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.5 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: reduced ? 0.01 : 0.28, ease }}
          className="flex items-center justify-center"
        >
          <Icon className="h-4 w-4" aria-hidden />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
