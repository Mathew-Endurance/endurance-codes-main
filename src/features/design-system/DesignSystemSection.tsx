import projectDesignSystem from "@/assets/project-design-system.jpg";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal, RevealItem, StaggerGroup } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { STORYBOOK_DOCS_URL, STORYBOOK_URL, designSystemPillars } from "./design-system.data";

export function DesignSystemSection() {
  return (
    <section id="system" className="border-y border-border bg-surface/30 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
            <MaskedText>Internal Tooling · 02</MaskedText>
          </h2>
          <p className="max-w-2xl text-3xl font-bold tracking-tight">
            <MaskedText delay={0.08}>UI — a component system, not a sticker pack.</MaskedText>
          </p>
        </div>
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <Reveal>
            <TiltCard className="overflow-hidden rounded-lg border border-border-strong bg-surface shadow-2xl">
              <img
                src={projectDesignSystem}
                alt="Endurance UI component library showcase"
                width={1600}
                height={1200}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </TiltCard>
          </Reveal>
          <div className="pt-2">
            <Reveal as="p" delay={0.1} className="mb-10 leading-relaxed text-muted-foreground">
              A React + TypeScript component library built around rigorous API design,
              accessibility, and documentation. Six engineers, one shared foundation, zero design
              drift.
            </Reveal>
            <StaggerGroup
              each={0.08}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border"
            >
              {designSystemPillars.map((pillar) => (
                <RevealItem key={pillar.title} className="bg-background p-6">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                    {pillar.title}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </RevealItem>
              ))}
            </StaggerGroup>
            <Reveal className="mt-10 flex gap-8">
              <a
                href={STORYBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-accent pb-1 text-sm font-semibold text-accent"
              >
                View Storybook
              </a>
              <a
                href={STORYBOOK_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-border-strong pb-1 text-sm font-semibold text-foreground"
              >
                Documentation
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
