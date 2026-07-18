import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  // Storybook runs its own Vite pipeline, so we re-add the two plugins the app
  // relies on: Tailwind v4 (to process `@import "tailwindcss"` in styles.css)
  // and the `@` path alias used across the codebase.
  viteFinal: async (cfg) => {
    const { mergeConfig } = await import("vite");
    return mergeConfig(cfg, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@": resolve(process.cwd(), "src"),
        },
      },
    });
  },
};

export default config;
