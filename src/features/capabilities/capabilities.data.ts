import { Activity, Gauge, Layers, Workflow } from "lucide-react";
import type { Capability } from "./capabilities.types";

export const capabilities: Capability[] = [
  {
    tag: "SYSTEM_DESIGN",
    icon: Layers,
    title: "Frontend Architecture",
    copy: "Modular, domain-driven React systems. Component boundaries, state ownership, and module contracts that scale beyond a single team.",
  },
  {
    tag: "PERF_ENGINEERING",
    icon: Gauge,
    title: "Performance Engineering",
    copy: "Rendering optimization, bundle splitting, and Core Web Vitals. Sub-second interactions in data-heavy production environments.",
  },
  {
    tag: "REAL_TIME",
    icon: Activity,
    title: "Real-Time Applications",
    copy: "WebSocket pipelines, streaming UIs, and async workflows. Handling high-frequency updates without dropping frames.",
  },
  {
    tag: "PRODUCT_ENG",
    icon: Workflow,
    title: "Product Engineering",
    copy: "Turning ambiguous requirements into shippable software. Collaborating closely with design and backend to own outcomes, not tickets.",
  },
];
