import { CalendarDays, FileDown } from "lucide-react";
import profileImage from "@/assets/profileImage.jpeg";
import resumePdf from "@/assets/Endurance-Mathew-CV.pdf";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal, RevealItem, StaggerGroup } from "@/components/motion/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="border-y border-border px-6  py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4">
          <span className="font-mono text-lg  uppercase tracking-widest text-accent text-bold ">
            <MaskedText>[ ABOUT ME ]</MaskedText>
          </span>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="profile-image-shell relative mx-auto w-full max-w-md">
            <div className="pointer-events-none absolute inset-0 -rotate-3 rounded-sm border-[3px] border-accent/70 shadow-[0_0_0_10px_rgba(59,130,246,0.08)]" />
            <div className="pointer-events-none absolute inset-0 translate-x-4 -translate-y-4 rotate-2 rounded-sm border-[2px] border-accent/30" />
            <div className="relative overflow-hidden rounded-sm border border-border-strong bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <img
                src={profileImage}
                alt="Endurance Mathew"
                className="profile-image h-full w-full object-cover"
              />
              <div className="absolute bottom-0 right-0 border border-border-strong bg-surface/90 px-6 py-4 text-center backdrop-blur">
                <div className="text-3xl font-bold text-accent">5+</div>
                <div className="mt-1 text-xs text-muted-foreground">Years Exp.</div>
              </div>
            </div>
          </Reveal>

          {/* Text content */}
          <StaggerGroup each={0.12}>
            <RevealItem
              as="h2"
              className="font-serif text-xl leading-snug tracking-tight text-foreground md:text-2xl"
            >
              I build to scale, not just to ship. Five years shipping across fintech, identity, and
              growth platforms showed me that cutting corners today creates problems tomorrow. I
              focus on getting it right so your projects stay maintainable and your clients stay
              happy, even as they grow.
            </RevealItem>
            <RevealItem as="p" className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
              I think of frontend engineering as managing complexity: defining clear module
              boundaries, keeping data flow predictable, and choosing the smallest abstraction that
              solves the problem.
            </RevealItem>
            <RevealItem as="p" className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              I&apos;ve led the architecture of multi-tenant platforms, owned performance budgets
              that moved Core Web Vitals from failing to green, and built component systems that let
              three teams ship without colliding.
            </RevealItem>
            <RevealItem as="p" className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              I optimize for the engineers who&apos;ll inherit the code as much as for the users
              running it.
            </RevealItem>
            <RevealItem className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://calendly.com/endurancemurray/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <CalendarDays className="h-4 w-4" /> Book a Call
              </a>
              <a
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated"
              >
                <FileDown className="h-4 w-4" /> Download CV
              </a>
            </RevealItem>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
