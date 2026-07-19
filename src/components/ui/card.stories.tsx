import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta = {
  title: "Endurance UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A surface container built from composable parts: `Card`, `CardHeader`,",
          "`CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`. Composition",
          "over configuration — you assemble the parts you need instead of toggling props.",
          "",
          "**Do**: keep one clear title per card and put actions in `CardFooter`.",
          "**Don't**: nest cards more than one level deep — the shadows stack and read as noise.",
          "",
          "**Accessibility**: `CardTitle` is a styled `<div>`, not a heading. If the card is a",
          "landmark on the page, wrap or replace the title with a real `<h2>`/`<h3>` for structure.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Deploy to production</CardTitle>
        <CardDescription>Ship the current branch to your live environment.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        This will build, run checks, and roll out with zero downtime.
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatCard: Story = {
  name: "Stat card",
  render: () => (
    <Card className="w-56">
      <CardHeader className="pb-2">
        <CardDescription>Feature time-to-ship</CardDescription>
        <CardTitle className="text-4xl text-accent">-40%</CardTitle>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">
        Reduced from 2-3 weeks to 1-2 weeks across teams.
      </CardContent>
    </Card>
  ),
};
