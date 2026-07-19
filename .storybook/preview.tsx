import { useEffect, useState } from "react";
import type { Preview } from "@storybook/react";
import { DocsContainer, type DocsContainerProps } from "@storybook/blocks";
import { addons } from "@storybook/preview-api";
import { themes } from "@storybook/theming";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";

import "../src/styles.css";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

/**
 * Docs pages (Introduction.mdx and every component's Docs tab) are rendered by
 * Storybook's own DocsContainer, which otherwise ignores our toolbar toggle and
 * stays permanently light. Subscribe to global changes so the surrounding page
 * chrome — prose, tables, code blocks — flips along with the story canvases.
 */
function ThemedDocsContainer({ children, context }: DocsContainerProps & { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const channel = addons.getChannel();
    const handler = ({ globals }: { globals: Record<string, unknown> }) => {
      const next = globals.theme === "dark" ? "dark" : "light";
      setTheme(next);
      applyTheme(next);
    };
    channel.on(GLOBALS_UPDATED, handler);
    return () => channel.off(GLOBALS_UPDATED, handler);
  }, []);

  return (
    <DocsContainer context={context} theme={theme === "dark" ? themes.dark : themes.light}>
      {children}
    </DocsContainer>
  );
}

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
    docs: {
      container: ThemedDocsContainer,
    },
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
      const theme = context.globals.theme as Theme;
      useEffect(() => {
        applyTheme(theme);
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
