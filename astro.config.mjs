// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://trasciendegym.com",

  // Forzamos salida estática ya que no tienes login ni DB
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    preact(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        "https://trasciendegym.com/",
        "https://trasciendegym.com/nosotros",
        "https://trasciendegym.com/contacto",
      ],
      serialize(item) {
        if (item.url === "https://trasciendegym.com/") {
          item.priority = 1.0;
        }
        if (item.url.includes("/nosotros")) {
          item.priority = 0.9;
        }
        return item;
      },
    }),
  ],

  // Ajuste para Cloudflare y optimización de imágenes
  adapter: cloudflare({
    imageService: "compile", // Soluciona el error de "sharp" en los logs
    platformProxy: {
      enabled: true,
    },
    prerenderEnvironment: "node",
  }),
});
