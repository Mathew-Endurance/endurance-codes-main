import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { MaskedText } from "@/components/motion/MaskedText";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal, RevealItem, StaggerGroup } from "@/components/motion/Reveal";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { TiltCard } from "@/components/motion/TiltCard";
import { TimelinePhase, TimelineTrack } from "@/components/motion/TimelineTrack";
import { riseIn } from "@/lib/motion";
import { getProjectById, ProjectGallery } from "@/features/projects";
import { notes } from "@/features/notes";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = getProjectById(params.id);
    if (!project) {
      throw notFound();
    }
    // Pick 2 random notes for "Related Reading". Done here (not in the
    // component) so the choice is stable across SSR + hydration.
    const relatedNotes = [...notes].sort(() => Math.random() - 0.5).slice(0, 2);
    return { project, relatedNotes };
  },
  head: (props) => {
    const project = getProjectById(props.params.id);
    return {
      meta: [
        { title: `${project?.name || "Case Study"} — Endurance Mathew` },
        {
          name: "description",
          content: project?.overview || "Frontend engineering case study",
        },
      ],
    };
  },
  component: CaseStudyPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-foreground">Case Study Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The case study you're looking for doesn't exist.
        </p>
        <a
          href="/#projects"
          className="mt-6 inline-flex items-center gap-2 rounded bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </a>
      </div>
    </div>
  ),
});

function CaseStudyPage() {
  const { project, relatedNotes } = Route.useLoaderData();

  return (
    <PageTransition>
      <main className="min-h-screen bg-background text-foreground">
        {/* Nav / Back */}
        <div className="border-b border-border bg-background/80 backdrop-blur-md fixed inset-x-0 top-0 z-50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Projects
            </a>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {project.tag}
            </span>
          </div>
          <ScrollProgress />
        </div>

        {/* Hero */}
        <section className="border-b border-border px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="text-accent">{project.index}</span>
              <span className="h-px flex-1 bg-border" />
              <span>{project.tag}</span>
            </Reveal>
            <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              <MaskedText delay={0.1}>{project.name}</MaskedText>
            </h1>
            <Reveal
              as="p"
              delay={0.25}
              className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              {project.overview}
            </Reveal>
            <StaggerGroup each={0.08} delay={0.35} className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <RevealItem key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </RevealItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Featured media — slideshow when a gallery exists, else a single image */}
        <section className="border-b border-border px-6 py-12">
          <div className="mx-auto max-w-6xl">
            {project.gallery && project.gallery.length > 0 ? (
              <Reveal>
                <ProjectGallery images={project.gallery} href={project.liveUrl} />
              </Reveal>
            ) : (
              <Reveal>
                <TiltCard className="overflow-hidden rounded-lg border border-border-strong bg-surface shadow-2xl">
                  <img src={project.image} alt={project.imageAlt} className="w-full object-cover" />
                </TiltCard>
              </Reveal>
            )}
          </div>
        </section>

        {/* Core Details */}
        <section className="border-b border-border px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <StaggerGroup each={0.12} className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              <RevealItem variants={riseIn}>
                <DetailCard label="Role">{project.role}</DetailCard>
              </RevealItem>
              <RevealItem variants={riseIn}>
                <DetailCard label="Problem">{project.problem}</DetailCard>
              </RevealItem>
              <RevealItem variants={riseIn}>
                <DetailCard label="Solution">{project.decisions}</DetailCard>
              </RevealItem>
              <RevealItem variants={riseIn}>
                <DetailCard label="Impact">{project.impact}</DetailCard>
              </RevealItem>
            </StaggerGroup>
          </div>
        </section>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="border-b border-border bg-surface/30 px-6 py-24">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-3xl font-bold tracking-tight">
                <MaskedText>Results &amp; Metrics</MaskedText>
              </h2>
              <StaggerGroup
                each={0.14}
                className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4"
              >
                {project.metrics.map((metric) => (
                  <RevealItem key={metric.label} variants={riseIn} className="bg-background p-8">
                    <CountUp value={metric.value} className="text-4xl font-bold text-accent" />
                    <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {metric.label}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {metric.context}
                    </p>
                  </RevealItem>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}

        {/* Timeline */}
        {project.timeline && project.timeline.length > 0 && (
          <section className="border-b border-border px-6 py-24">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-3xl font-bold tracking-tight">
                <MaskedText>How We Built It</MaskedText>
              </h2>
              <TimelineTrack className="space-y-8">
                {project.timeline.map((phase, index) => (
                  <TimelinePhase key={phase.phase}>
                    <div className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                      Phase {index + 1}
                    </div>
                    <h3 className="mb-3 text-xl font-bold">{phase.phase}</h3>
                    {phase.description && (
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {phase.description}
                      </p>
                    )}
                    {phase.points && phase.points.length > 0 && (
                      <ul className="space-y-2">
                        {phase.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </TimelinePhase>
                ))}
              </TimelineTrack>
            </div>
          </section>
        )}

        {/* Code Snippets */}
        {project.codeSnippets && project.codeSnippets.length > 0 && (
          <section className="border-b border-border bg-surface/30 px-6 py-24">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-3xl font-bold tracking-tight">
                <MaskedText>Technical Deep Dive</MaskedText>
              </h2>
              <div className="space-y-16">
                {project.codeSnippets.map((snippet) => (
                  <Reveal key={snippet.title}>
                    <div className="mb-6">
                      <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
                        <Code2 className="h-5 w-5 text-accent" />
                        {snippet.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{snippet.description}</p>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-border bg-background/80">
                      <pre className="overflow-x-auto p-6 font-mono text-sm text-foreground">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Lessons Learned */}
        {project.lessonsLearned && project.lessonsLearned.length > 0 && (
          <section className="border-b border-border px-6 py-24">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-3xl font-bold tracking-tight">
                <MaskedText>Lessons Learned</MaskedText>
              </h2>
              <StaggerGroup each={0.12} className="space-y-6">
                {project.lessonsLearned.map((lesson, index) => (
                  <RevealItem key={index} className="border-l-2 border-accent pl-6 py-4">
                    <p className="text-base leading-relaxed text-muted-foreground">{lesson}</p>
                  </RevealItem>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedNotes.length > 0 && (
          <section className="border-b border-border bg-surface/30 px-6 py-24">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-3xl font-bold tracking-tight">
                <MaskedText>Related Reading</MaskedText>
              </h2>
              <StaggerGroup each={0.12} className="grid gap-4 md:grid-cols-2">
                {relatedNotes.map((note) => (
                  <RevealItem
                    key={note.title}
                    variants={riseIn}
                    className="group block rounded border border-border bg-background transition-colors hover:bg-surface/50"
                  >
                    <a
                      href={note.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full rounded border border-transparent p-6"
                    >
                      <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        <span>{note.date}</span>
                        <span className="h-px flex-1 bg-border" />
                        <span className="text-accent">{note.tag}</span>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-accent">
                        {note.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{note.blurb}</p>
                    </a>
                  </RevealItem>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}

        {/* Stack */}
        <section className="border-b border-border px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-lg font-bold">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border-strong bg-surface px-4 py-2 font-mono text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">Want to work together?</h2>
            <p className="mb-8 text-muted-foreground">
              I help agencies scale and build with confidence.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

function DetailCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent">{label}</dt>
      <dd className="text-sm leading-relaxed text-foreground">{children}</dd>
    </div>
  );
}
