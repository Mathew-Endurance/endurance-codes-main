import { useEffect } from "react";
import type { Preview } from "@storybook/react";

import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    // The app's design tokens paint the real background; Storybook's own
    // backgrounds addon would fight them, so we disable it and rely on `.dark`.
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: ["Endurance UI", ["Introduction"], "*"],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Light / dark theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as "light" | "dark";
      useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
        root.style.colorScheme = theme;
      }, [theme]);

      return (
        <div className="bg-background text-foreground" style={{ padding: "2rem", minWidth: 340 }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
