import { createFileRoute } from "@tanstack/react-router";

import { NavBar } from "@/features/navigation";
import { HeroSection } from "@/features/hero";
import { AboutSection } from "@/features/about";
import { CapabilitiesSection } from "@/features/capabilities";
import { ProjectsSection } from "@/features/projects";
import { DesignSystemSection } from "@/features/design-system";
import { SkillsSection } from "@/features/skills";
import { NotesSection } from "@/features/notes";
import { ExperienceSection } from "@/features/experience";
import { ContactSection } from "@/features/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Endurance Mathew — Senior Frontend Engineer" },
      {
        name: "description",
        content:
          "Senior Frontend Engineer building scalable React and Next.js applications. Frontend architecture, performance, and real-time systems.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <CapabilitiesSection />
      <ProjectsSection />
      <DesignSystemSection />
      <SkillsSection />
      <NotesSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
