import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal, RevealItem, StaggerGroup } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { usePinnedColumn } from "@/hooks/use-pinned-column";
import type { Project } from "./projects.types";
import { ProjectField } from "./ProjectField";

export function ProjectCase({ project: p }: { project: Project }) {
  const articleRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  // The image column holds still while the case-study copy scrolls past it.
  usePinnedColumn(articleRef, mediaRef);

  return (
    <article ref={articleRef} className="grid items-start gap-12 md:grid-cols-2 md:gap-20">
      <div ref={mediaRef} className={p.reverse ? "md:order-2" : ""}>
        <Reveal>
          <TiltCard className="overflow-hidden rounded-lg border border-border-strong bg-surface shadow-2xl">
            <img
              src={p.image}
              alt={p.imageAlt}
              width={1600}
              height={1200}
              loading="lazy"
              className="w-full object-cover"
            />
          </TiltCard>
        </Reveal>
        <StaggerGroup each={0.05} className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <RevealItem
              key={s}
              as="span"
              className="rounded border border-border-strong bg-surface px-3 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {s}
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>

      <div className={p.reverse ? "md:order-1 pt-4" : "pt-4"}>
        <Reveal className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="text-accent">{p.index}</span>
          <span className="h-px flex-1 bg-border" />
          <span>{p.tag}</span>
        </Reveal>
        <h3 className="mb-4 text-4xl font-bold tracking-tight">
          <MaskedText>{p.name}</MaskedText>
        </h3>
        <Reveal as="p" delay={0.1} className="mb-10 leading-relaxed text-muted-foreground">
          {p.overview}
        </Reveal>
        <StaggerGroup as="dl" each={0.1} className="space-y-7">
          <RevealItem>
            <ProjectField label="Role">{p.role}</ProjectField>
          </RevealItem>
          <RevealItem>
            <ProjectField label="Problem">{p.problem}</ProjectField>
          </RevealItem>
          <RevealItem>
            <ProjectField label="Engineering Decisions">{p.decisions}</ProjectField>
          </RevealItem>
          <RevealItem>
            <ProjectField label="Impact">{p.impact}</ProjectField>
          </RevealItem>
        </StaggerGroup>
        <Reveal className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <a
            href={`/projects/${p.id}`}
            className="group inline-flex items-center gap-1.5 border-b border-accent pb-1 text-sm font-semibold text-accent transition-colors hover:text-foreground"
          >
            View Case Study
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          {p.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group inline-flex items-center gap-1.5 border-b border-border-strong pb-1 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </Reveal>
      </div>
    </article>
  );
}
