import { MaskedText } from "@/components/motion/MaskedText";
import { RevealItem, StaggerGroup } from "@/components/motion/Reveal";
import { skillGroups } from "./skills.data";

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
            <MaskedText>Technical Stack</MaskedText>
          </h2>
          <p className="text-3xl font-bold tracking-tight">
            <MaskedText delay={0.08}>The toolchain.</MaskedText>
          </p>
        </div>
        <StaggerGroup
          each={0.07}
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((g) => (
            <RevealItem key={g.title} className="bg-background p-8">
              <div className="mb-5 flex items-center gap-2">
                <g.icon className="h-3.5 w-3.5 text-accent" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {g.title}
                </span>
              </div>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="text-sm text-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
