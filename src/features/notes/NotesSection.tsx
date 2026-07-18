import { notes } from "./notes.data";

export function NotesSection() {
  return (
    <section id="notes" className="border-t border-border px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
              Engineering Notes
            </h2>
            <p className="text-3xl font-bold tracking-tight">Thinking in systems.</p>
          </div>
          <a href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">
            VIEW ALL ARTICLES →
          </a>
        </div>
        <div className="grid gap-px overflow-hidden border border-border bg-border">
          {notes.map((p) => (
            <a
              key={p.title}
              href={p.link}
              className="group block bg-background p-8 transition-colors hover:bg-surface/40 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mb-3 flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>{p.date}</span>
                <span className="h-px flex-1 bg-border" />
                <span className="text-accent">{p.tag}</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold transition-colors group-hover:text-accent">
                {p.title}
              </h3>
              <p className="max-w-2xl text-sm text-muted-foreground">{p.blurb}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
