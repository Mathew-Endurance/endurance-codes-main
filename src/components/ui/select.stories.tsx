import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "Endurance UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A single-choice dropdown built on Radix. Composed from `SelectTrigger`,",
          "`SelectValue`, `SelectContent`, and `SelectItem`, with optional `SelectGroup` +",
          "`SelectLabel` for grouping.",
          "",
          "**Do**: give the trigger a visible label and a `SelectValue` placeholder.",
          "**Don't**: use a select for 2-3 options — `RadioGroup` or a segmented `Tabs` reads faster.",
          "",
          "**Accessibility**: Radix handles the listbox roles, type-ahead, and full keyboard",
          "navigation. Associate the trigger with a `<Label htmlFor>`.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="fruit">Favorite fruit</Label>
      <Select>
        <SelectTrigger id="fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Grouped: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="tz">Timezone</Label>
      <Select>
        <SelectTrigger id="tz">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Africa</SelectLabel>
            <SelectItem value="lagos">Lagos (WAT)</SelectItem>
            <SelectItem value="nairobi">Nairobi (EAT)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="london">London (GMT)</SelectItem>
            <SelectItem value="berlin">Berlin (CET)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="disabled-select" className="opacity-50">
        Plan
      </Label>
      <Select disabled>
        <SelectTrigger id="disabled-select">
          <SelectValue placeholder="Upgrade required" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pro">Pro</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
