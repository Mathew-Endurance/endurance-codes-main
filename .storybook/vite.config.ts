import { defineConfig } from "vite";

// Intentionally empty. Storybook must NOT load the app's root vite.config.ts,
// which pulls in TanStack Start + nitro and redirects the build output into a
// client/ folder (breaking iframe.html generation). Storybook's own plugins
// (Tailwind + the @ alias) are added in main.ts via viteFinal.
export default defineConfig({});
