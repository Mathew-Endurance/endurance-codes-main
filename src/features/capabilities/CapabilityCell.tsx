import type { Capability } from "./capabilities.types";

export function CapabilityCell({ tag, icon: Icon, title, copy }: Capability) {
  return (
    <div className="group relative space-y-4 p-10 transition-colors hover:bg-surface/50">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
          [ {tag} ]
        </span>
        <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{copy}</p>
    </div>
  );
}
