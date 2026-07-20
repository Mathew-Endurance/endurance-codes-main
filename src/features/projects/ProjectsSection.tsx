import { MaskedText } from "@/components/motion/MaskedText";
import { projects } from "./projects.data";
import { ProjectCase } from "./ProjectCase";

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border px-6  py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
            <MaskedText>Selected Case Studies</MaskedText>
          </h2>
          <p className="max-w-2xl text-3xl font-bold tracking-tight">
            <MaskedText delay={0.08}>
              Engineering high-performance interfaces for production.
            </MaskedText>
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
