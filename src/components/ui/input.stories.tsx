import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Endurance UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A single-line text field. Forwards its ref and spreads every native",
          "`<input>` attribute, so it drops into React Hook Form or a plain form unchanged.",
          "",
          "**Do**: always pair an input with a `<Label htmlFor>` — placeholders are not labels.",
          "**Don't**: rely on colour alone to signal an error; add a text message.",
          "",
          "**Accessibility**: connect the label with `htmlFor`/`id`. For error states, link the",
          "message with `aria-describedby` and set `aria-invalid` so assistive tech announces it.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    type: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    type: "text",
    placeholder: "you@example.com",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, value: "Can't touch this", readOnly: true },
};

export const ErrorState: Story = {
  name: "Error state",
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="email-error">Email</Label>
      <Input
        id="email-error"
        type="email"
        defaultValue="not-an-email"
        aria-invalid
        aria-describedby="email-error-msg"
        className="border-destructive focus-visible:ring-destructive"
      />
      <p id="email-error-msg" className="text-xs text-destructive">
        Enter a valid email address.
      </p>
    </div>
  ),
};
