import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Badge } from "./badge";

const meta = {
  title: "Endurance UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A small status/metadata label. Non-interactive by default.",
          "",
          "**Usage**: statuses (`Active`, `Beta`), counts, and categorical tags.",
          "",
          "**Do**: keep the text to one or two words.",
          '**Don\'t**: use a badge as a button — reach for `Button size="sm"` if it needs to be clickable.',
          "",
          "**Accessibility**: renders a `<div>` — if the badge conveys status that isn't obvious",
          "from context, add descriptive text or an `aria-label` so it isn't lost to screen readers.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
    children: { control: "text" },
  },
  args: {
    variant: "default",
    children: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
