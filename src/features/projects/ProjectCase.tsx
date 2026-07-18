import { ArrowUpRight } from "lucide-react";
import type { Project } from "./projects.types";
import { ProjectField } from "./ProjectField";

export function ProjectCase({ project: p }: { project: Project }) {
  return (
    <article className="grid items-start gap-12 md:grid-cols-2 md:gap-20">
      <div className={p.reverse ? "md:order-2" : ""}>
        <div className="overflow-hidden rounded-lg border border-border-strong bg-surface shadow-2xl">
          <img
            src={p.image}
            alt={p.imageAlt}
            width={1600}
            height={1200}
            loading="lazy"
            className="w-full object-cover"
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded border border-border-strong bg-surface px-3 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className={p.reverse ? "md:order-1 pt-4" : "pt-4"}>
        <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="text-accent">{p.index}</span>
          <span className="h-px flex-1 bg-border" />
          <span>{p.tag}</span>
        </div>
        <h3 className="mb-4 text-4xl font-bold tracking-tight">{p.name}</h3>
        <p className="mb-10 leading-relaxed text-muted-foreground">{p.overview}</p>
        <dl className="space-y-7">
          <ProjectField label="Role">{p.role}</ProjectField>
          <ProjectField label="Problem">{p.problem}</ProjectField>
          <ProjectField label="Engineering Decisions">{p.decisions}</ProjectField>
          <ProjectField label="Impact">{p.impact}</ProjectField>
        </dl>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <a
            href={`/projects/${p.id}`}
            className="inline-flex items-center gap-1.5 border-b border-accent pb-1 text-sm font-semibold text-accent transition-colors hover:text-foreground"
          >
            View Case Study <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          {p.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center gap-1.5 border-b border-border-strong pb-1 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
