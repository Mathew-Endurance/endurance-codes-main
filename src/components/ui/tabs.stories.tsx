import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Endurance UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Switches between related panels without navigating away. Built on Radix:",
          "`Tabs` (root), `TabsList`, `TabsTrigger`, and `TabsContent`. Works uncontrolled",
          "(`defaultValue`) or controlled (`value` + `onValueChange`).",
          "",
          "**Do**: keep tab labels to a single word or two, and cap the count at ~5.",
          "**Don't**: put tabs inside tabs, or use them for sequential steps — use a wizard.",
          "",
          '**Accessibility**: Radix wires up `role="tablist"`/`tab`/`tabpanel` and arrow-key',
          "navigation between triggers automatically.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-sm text-muted-foreground">
        A snapshot of the project at a glance.
      </TabsContent>
      <TabsContent value="activity" className="text-sm text-muted-foreground">
        Recent events and changes.
      </TabsContent>
      <TabsContent value="settings" className="text-sm text-muted-foreground">
        Configure preferences and access.
      </TabsContent>
    </Tabs>
  ),
};

function ControlledTabs() {
  const [tab, setTab] = useState("account");
  return (
    <div className="w-80 space-y-3">
      <p className="font-mono text-xs text-muted-foreground">
        active tab: <span className="text-accent">{tab}</span>
      </p>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="text-sm text-muted-foreground">
          Manage your account details.
        </TabsContent>
        <TabsContent value="billing" className="text-sm text-muted-foreground">
          Update your billing information.
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledTabs />,
};
