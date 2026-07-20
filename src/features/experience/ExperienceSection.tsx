import { CalendarDays, FileDown } from "lucide-react";
import { MaskedText } from "@/components/motion/MaskedText";
import { RevealItem, StaggerGroup } from "@/components/motion/Reveal";
import { experienceRoles } from "./experience.data";
import resumePdf from "@/assets/Endurance-Mathew-CV.pdf";

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-border px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 font-mono text-xs uppercase tracking-widest text-accent">
          <MaskedText>Experience Timeline</MaskedText>
        </h2>
        <StaggerGroup as="ol" each={0.12} className="space-y-12">
          {experienceRoles.map((r) => (
            <RevealItem
              key={r.title + r.company}
              as="li"
              className="grid gap-4 border-t border-border pt-8 md:grid-cols-[220px_1fr] "
            >
              <div className="font-mono text-xs text-muted-foreground">{r.period} </div>

              <div>
                <h3 className="text-lg font-bold ">
                  {r.title}{" "}
                  <span className="font-normal text-muted-foreground"> — {r.company}</span>
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </StaggerGroup>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://calendly.com/endurancemurray/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <CalendarDays className="h-4 w-4" /> Book a Call
          </a>
          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated"
          >
            <FileDown className="h-4 w-4" /> Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
