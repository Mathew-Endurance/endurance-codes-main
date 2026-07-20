import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ease } from "@/lib/motion";

/**
 * Splits a display metric into a leading prefix, a number, and a trailing
 * suffix — "-40%" → ["-", 40, "%"], "1.4s" → ["", 1.4, "s"], "60fps" →
 * ["", 60, "fps"].
 *
 * Returns null when there is no number to animate, so the caller can fall back
 * to rendering the string as-is.
 */
function parseMetric(value: string) {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    target: parseFloat(digits),
    suffix,
    // Preserve the source precision so "1.4s" does not land on "1s".
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
  };
}

/**
 * Counts a metric up from zero the first time it scrolls into view.
 *
 * Renders the final value immediately under reduced motion, and for any string
 * without a number in it.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const parsed = parseMetric(value);

  // Starts at the true value so the server HTML is correct: a visitor with JS
  // disabled sees "-40%", not a stranded "-0%". The client resets it to zero on
  // mount — while the metric is still hidden behind its reveal — and counts up
  // from there.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed || reduced) return;
    setDisplay(`${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduced]);

  useEffect(() => {
    if (!parsed) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const controls = animate(0, parsed.target, {
      duration: 1.6,
      ease,
      onUpdate: (latest) => {
        setDisplay(`${parsed.prefix}${latest.toFixed(parsed.decimals)}${parsed.suffix}`);
      },
    });

    return () => controls.stop();
    // `parsed` is derived from `value`, so `value` is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {/* The static value keeps the metric accessible and machine-readable
          while the visible text is mid-count. */}
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
