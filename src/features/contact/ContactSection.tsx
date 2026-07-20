import { Mail } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { contactEmail, contactMailHref, resourceLinks, socialLinks } from "./contact.data";

export function ContactSection() {
  return (
    <footer id="contact" className="border-t border-border px-6 py-32">
      <div className="mx-auto grid max-w-6xl gap-20 md:grid-cols-2">
        <div>
          <h2 className="mb-8 text-4xl font-bold tracking-tight text-balance">
            <MaskedText>Interested in building scalable frontend systems?</MaskedText>
          </h2>
          <Reveal as="p" delay={0.1} className="mb-12 text-xl text-muted-foreground">
            Let&apos;s talk about architecture, product engineering, or senior frontend roles.
          </Reveal>
          <Reveal delay={0.18}>
            <MagneticButton>
              <a
                href={contactMailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-primary px-10 py-5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <Mail className="h-4 w-4" /> {contactEmail}
              </a>
            </MagneticButton>
          </Reveal>
        </div>
        <div className="space-y-12">
          <div className="grid grid-cols-2 gap-8 font-mono text-xs">
            <div>
              <h4 className="mb-4 text-muted-foreground/60">SOCIAL</h4>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-foreground hover:text-accent">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-muted-foreground/60">RESOURCES</h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => {
                  const isExternal = !link.href.startsWith("#");
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-foreground hover:text-accent"
                        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              © {new Date().getFullYear()} Endurance Mathew. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
