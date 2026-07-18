import type { ReactNode } from "react";

export function ProjectField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-foreground">{children}</dd>
    </div>
  );
}
