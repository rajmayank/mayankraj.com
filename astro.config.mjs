import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [tailwind(), react(), sitemap(), mdx()],
  output: "server",
  adapter: cloudflare(),
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  vite: {
    ssr: {
      external: ["@iconify/react"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  },
});
