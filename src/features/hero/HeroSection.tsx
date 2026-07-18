import { ArrowRight, FileDown } from "lucide-react";
import resumePdf from "@/assets/Endurance-Mathew-CV.pdf";
import { heroSocials } from "./hero.data";

export function HeroSection() {
  return (
    <section id="top" className="px-6 pt-30 lg:pt-40 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for Senior Roles
        </div>
        <h1 className="mb-8 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-[75px]">
          I'm Endurance Mathew, <br />
          <span className="text-muted-foreground">A Senior Frontend Engineer.</span>
        </h1>
        <p className="mb-12 max-w-2xl text-md leading-relaxed text-muted-foreground">
          5+ years crafting scalable web applications across fintech, compliance, and startup
          ecosystems. Currently building products that connect startups, investors, and business
          support organizations through intuitive digital experiences..
        </p>
        <div className="mb-20 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-border-strong bg-surface px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated"
          >
            <FileDown className="h-4 w-4" /> Download Resume
          </a>
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
        </div>
      </div>
    </section>
  );
}
