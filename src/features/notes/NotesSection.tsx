import { useState } from "react";
import { Loader2 } from "lucide-react";
import { notes } from "./notes.data";

const PAGE_SIZE = 3;

export function NotesSection() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);

  const shown = notes.slice(0, visible);
  const remaining = notes.length - visible;

  function loadMore() {
    setLoading(true);
    window.setTimeout(() => {
      setVisible((v) => Math.min(v + PAGE_SIZE, notes.length));
      setLoading(false);
    }, 500);
  }

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
          {/* <a href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">
            VIEW ALL ARTICLES →
          </a> */}
        </div>
        <div className="grid gap-px overflow-hidden border border-border bg-border">
          {shown.map((p) => (
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
          {loading &&
            Array.from({ length: Math.min(PAGE_SIZE, remaining) }).map((_, i) => (
              <div key={`skeleton-${i}`} className="bg-background p-8" aria-hidden="true">
                <div className="mb-3 flex items-center gap-4">
                  <span className="h-2 w-28 animate-pulse rounded-sm bg-border" />
                  <span className="h-px flex-1 bg-border" />
                  <span className="h-2 w-16 animate-pulse rounded-sm bg-border" />
                </div>
                <div className="mb-4 h-5 w-2/3 animate-pulse rounded-sm bg-border" />
                <div className="mb-2 h-3 w-full max-w-2xl animate-pulse rounded-sm bg-border" />
                <div className="h-3 w-1/2 max-w-2xl animate-pulse rounded-sm bg-border" />
              </div>
            ))}
        </div>
        <div aria-live="polite" className="sr-only">
          {loading
            ? "Loading more notes"
            : `Showing ${shown.length} of ${notes.length} notes`}
        </div>
        {remaining > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              className="cursor-pointer group inline-flex items-center gap-3 border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-border disabled:hover:text-muted-foreground"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Loading
                </>
              ) : (
                <>
                  Load More
                  <span className="text-accent">({remaining})</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
