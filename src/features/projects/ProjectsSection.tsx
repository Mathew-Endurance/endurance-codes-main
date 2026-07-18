import { projects } from "./projects.data";
import { ProjectCase } from "./ProjectCase";

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border px-6  py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
            Selected Case Studies
          </h2>
          <p className="max-w-2xl text-3xl font-bold tracking-tight">
            Engineering high-performance interfaces for production.
          </p>
        </div>
        <div className="space-y-40">
          {projects.map((p) => (
            <ProjectCase key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
