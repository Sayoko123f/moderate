// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
// Run `npx astro sync` after edit this file.
export default defineConfig({
  site: "https://www.my-site.dev",
  base: "/",
  trailingSlash: "never",
  integrations: [tailwind(), mdx()],
});