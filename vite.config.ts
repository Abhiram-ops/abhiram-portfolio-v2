import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { renderStaticContent } from "./src/seo";

// Canonical origin used for og:url / og:image (those must be absolute). Override with SITE_URL if the site moves.
const SITE_URL = (process.env.SITE_URL ?? "https://abhiram-ops.github.io/abhiram-portfolio-v2").replace(/\/$/, "");

const staticContent = (): Plugin => ({
  name: "static-content",
  transformIndexHtml: (html) =>
    html.replace("<!--static-content-->", renderStaticContent()).replace(/__SITE_URL__/g, SITE_URL),
});

export default defineConfig({
  base: "./",
  plugins: [react(), staticContent()],
});
