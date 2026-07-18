import { Activity, Boxes, Cpu, Gauge, Layers, Workflow } from "lucide-react";
import type { SkillGroup } from "./skills.types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Cpu,
    items: ["React", "Next.js", "Angular", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Architecture",
    icon: Layers,
    items: ["Component Systems", "Design Systems", "State Management", "Frontend Architecture"],
  },
  {
    title: "Performance",
    icon: Gauge,
    items: ["Core Web Vitals", "Bundle Optimization", "Rendering Strategies", "SEO"],
  },
  {
    title: "Testing",
    icon: Activity,
    items: ["Jest", "React Testing Library", "Visual Regression"],
  },
  {
    title: "Integration",
    icon: Workflow,
    items: ["REST APIs", "GraphQL", "Authentication", "WebSockets"],
  },
  { title: "Tooling", icon: Boxes, items: ["Git", "CI/CD", "Vite", "Webpack"] },
];
