import { ArrowRight, FileDown } from "lucide-react";
import { motion } from "motion/react";

import resumePdf from "@/assets/Endurance-Mathew-CV.pdf";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, ease, stagger, staticVariants, wordReveal } from "@/lib/motion";
import { heroSocials } from "./hero.data";
import { ParticleField } from "./ParticleField";

const HEADLINE_LEAD = "I'm Endurance Mathew,";
const HEADLINE_TRAIL = "A Senior Frontend Engineer.";

/** Splits a line into words that animate individually. */
function AnimatedWords({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          // The gap is a margin, not a space character: whitespace at the edge
          // of an overflow-hidden inline-block collapses and words would jam.
          className="mr-[0.25em] inline-block overflow-hidden pb-[0.06em] align-bottom"
        >
          <motion.span className={`inline-block ${className ?? ""}`} variants={wordReveal}>
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const reduced = useReducedMotion();
  const container = reduced ? staticVariants : stagger(0.06);
  const item = reduced
    ? staticVariants
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease } },
      };

  return (
    <section id="top" className="relative overflow-hidden px-6 pt-30 lg:pt-40 pb-8">
      <ParticleField className="pointer-events-none absolute inset-0 h-full w-full" />
      {/* Fades the field out toward the page so it never competes with the copy. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />

      <motion.div
        className="relative mx-auto max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.div
          variants={item}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for Senior Roles
        </motion.div>

        <h1 className="mb-8 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-[75px]">
          <AnimatedWords text={HEADLINE_LEAD} />
          <br />
          <AnimatedWords text={HEADLINE_TRAIL} className="text-muted-foreground" />
        </h1>

        <motion.p
          variants={item}
          className="mb-12 max-w-2xl text-md leading-relaxed text-muted-foreground"
        >
          5+ years crafting scalable web applications across fintech, compliance, and startup
          ecosystems. Currently building products that connect startups, investors, and business
          support organizations through intuitive digital experiences..
        </motion.p>

        <motion.div variants={item} className="mb-20 flex flex-wrap items-center gap-4">
          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-border-strong bg-surface px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated"
            >
              <FileDown className="h-4 w-4" /> Download Resume
            </a>
          </MagneticButton>
          <div className="mx-4 hidden h-10 w-px bg-border-strong md:block" />
          <div className="flex gap-6 font-mono text-xs text-muted-foreground">
            {heroSocials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="h-3.5 w-3.5" /> {social.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
