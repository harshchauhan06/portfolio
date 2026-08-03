import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * vite.config.js
 *
 * The /api proxy forwards to the optional Node server (server/server.mjs).
 * If the server is not running, ContributionsSection falls back to the
 * bundled src/data/leetcode.json cache automatically — no 502 is surfaced.
 *
 * NOTE: The old configureServer middleware was removed because it intercepted
 * every /api/leetcode request before the proxy could fire, then returned the
 * empty leetcode-graph.json file, causing a silent 502 upstream.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        // Don't throw on proxy errors — the frontend has its own fallback.
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.warn("[vite proxy] LeetCode server unavailable:", err.message);
          });
        },
      },
    },
  },
});