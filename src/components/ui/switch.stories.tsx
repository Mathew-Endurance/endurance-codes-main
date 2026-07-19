import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
  title: "Endurance UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "An instant on/off toggle built on Radix. Use it for settings that apply",
          "immediately — no save button in between.",
          "",
          '**Do**: use a switch when the change takes effect at once (e.g. "Email notifications").',
          "**Don't**: use a switch inside a form that needs an explicit submit — use a `Checkbox`.",
          "",
          '**Accessibility**: Radix exposes `role="switch"` and `aria-checked`, and it is keyboard',
          "operable. Pair it with a `<Label htmlFor>`.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Email notifications</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="s1" />
        <Label htmlFor="s1">Off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s2" defaultChecked />
        <Label htmlFor="s2">On</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s3" disabled />
        <Label htmlFor="s3" className="opacity-50">
          Disabled
        </Label>
      </div>
    </div>
  ),
};
