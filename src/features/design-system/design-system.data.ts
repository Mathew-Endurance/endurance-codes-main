import type { DesignSystemPillar } from "./design-system.types";

export const STORYBOOK_URL = "https://endurancemathewstorybook.netlify.app/";

export const STORYBOOK_DOCS_URL = `${STORYBOOK_URL}/?path=/docs/endurance-ui-introduction--docs`;

export const designSystemPillars: DesignSystemPillar[] = [
  {
    title: "WAI-ARIA",
    description: "Full keyboard and screen-reader support across every primitive.",
  },
  {
    title: "Typed APIs",
    description: "Strict prop contracts. Variants modeled as discriminated unions.",
  },
  {
    title: "Storybook",
    description: "Every component documented with usage, do/don't, a11y notes.",
  },
  {
    title: "Tested",
    description: "Unit + interaction tests. Visual regression on critical primitives.",
  },
];
