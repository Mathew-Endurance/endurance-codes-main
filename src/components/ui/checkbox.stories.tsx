import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Endurance UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A binary toggle built on Radix. Supports checked, unchecked, and",
          "`indeterminate` states, and is fully keyboard operable (Space to toggle).",
          "",
          "**Do**: wrap the label with `<Label htmlFor>` so the text is a click target too.",
          "**Don't**: use a checkbox for mutually exclusive options — use `RadioGroup`.",
          "",
          '**Accessibility**: Radix manages `role="checkbox"` and `aria-checked`. Always give it',
          "an associated label via `htmlFor`/`id`.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="c1" />
        <Label htmlFor="c1">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c2" defaultChecked />
        <Label htmlFor="c2">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c3" disabled />
        <Label htmlFor="c3" className="opacity-50">
          Disabled
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c4" defaultChecked disabled />
        <Label htmlFor="c4" className="opacity-50">
          Disabled + checked
        </Label>
      </div>
    </div>
  ),
};
