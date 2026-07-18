import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";
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
      </div>

      {/* Hero */}
      <section className="border-b border-border px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="text-accent">{project.index}</span>
            <span className="h-px flex-1 bg-border" />
            <span>{project.tag}</span>
          </div>
          <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            {project.name}
          </h1>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.overview}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured media — slideshow when a gallery exists, else a single image */}
      <section className="border-b border-border px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {project.gallery && project.gallery.length > 0 ? (
            <ProjectGallery images={project.gallery} href={project.liveUrl} />
          ) : (
            <div className="overflow-hidden rounded-lg border border-border-strong bg-surface shadow-2xl">
              <img src={project.image} alt={project.imageAlt} className="w-full object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* Core Details */}
      <section className="border-b border-border px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <DetailCard label="Role">{project.role}</DetailCard>
            <DetailCard label="Problem">{project.problem}</DetailCard>
            <DetailCard label="Solution">{project.decisions}</DetailCard>
            <DetailCard label="Impact">{project.impact}</DetailCard>
          </div>
        </div>
      </section>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="border-b border-border bg-surface/30 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-3xl font-bold tracking-tight">Results & Metrics</h2>
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="bg-background p-8">
                  <div className="text-4xl font-bold text-accent">{metric.value}</div>
                  <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {metric.label}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {metric.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {project.timeline && project.timeline.length > 0 && (
        <section className="border-b border-border px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-3xl font-bold tracking-tight">How We Built It</h2>
            <div className="space-y-8">
              {project.timeline.map((phase, index) => (
                <div key={phase.phase} className="relative border-l-2 border-accent pl-8 pb-8">
                  <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-background bg-accent" />
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Code Snippets */}
      {project.codeSnippets && project.codeSnippets.length > 0 && (
        <section className="border-b border-border bg-surface/30 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-3xl font-bold tracking-tight">Technical Deep Dive</h2>
            <div className="space-y-16">
              {project.codeSnippets.map((snippet) => (
                <div key={snippet.title}>
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lessons Learned */}
      {project.lessonsLearned && project.lessonsLearned.length > 0 && (
        <section className="border-b border-border px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-3xl font-bold tracking-tight">Lessons Learned</h2>
            <div className="space-y-6">
              {project.lessonsLearned.map((lesson, index) => (
                <div key={index} className="border-l-2 border-accent pl-6 py-4">
                  <p className="text-base leading-relaxed text-muted-foreground">{lesson}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedNotes.length > 0 && (
        <section className="border-b border-border bg-surface/30 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-3xl font-bold tracking-tight">Related Reading</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedNotes.map((note) => (
                <a
                  key={note.title}
                  href={note.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded border border-border bg-background p-6 transition-colors hover:bg-surface/50"
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
              ))}
            </div>
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
