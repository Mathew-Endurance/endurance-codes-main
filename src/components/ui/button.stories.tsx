import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Trash2 } from "lucide-react";

import { Button } from "./button";

const meta = {
  title: "Endurance UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "The primary action primitive. Variants are modeled as a typed",
          "`class-variance-authority` union, so invalid combinations fail at compile time.",
          "",
          "**Usage**",
          "- Use `default` for the single primary action in a view.",
          "- Use `secondary` / `outline` for secondary actions, `ghost` for low-emphasis toolbar actions.",
          "- Use `destructive` only for irreversible actions, and pair it with a confirmation.",
          "",
          "**Do**: keep one `default` button per section so the primary path is obvious.",
          "**Don't**: stack two `default` buttons side by side — demote one to `secondary`.",
          "",
          "**Accessibility**: renders a native `<button>` (keyboard + screen-reader ready).",
          'Icon-only buttons (`size="icon"`) must set an `aria-label`. Use `asChild` to render',
          "a semantic `<a>` when the action navigates.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    variant: "default",
    size: "default",
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Delete">
        <Trash2 />
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Button>
      Continue <ArrowRight />
    </Button>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

export const AsLink: Story = {
  name: "As Link (asChild)",
  render: () => (
    <Button asChild>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Visit link <ArrowRight />
      </a>
    </Button>
  ),
};
