import { capabilities } from "./capabilities.data";
import { CapabilityCell } from "./CapabilityCell";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="px-6  py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
              Engineering Capabilities
            </h2>
            <p className="text-3xl font-bold tracking-tight">What I do well.</p>
          </div>
        </div>
        <div className="grid divide-y divide-border border border-border md:grid-cols-2 md:divide-y-0 md:divide-x">
          {capabilities.slice(0, 2).map((it) => (
            <CapabilityCell key={it.title} {...it} />
          ))}
        </div>
        <div className="grid divide-y divide-border border border-t-0 border-border md:grid-cols-2 md:divide-y-0 md:divide-x">
          {capabilities.slice(2).map((it) => (
            <CapabilityCell key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
