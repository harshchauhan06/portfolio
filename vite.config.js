import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith("/api/leetcode")) {
        const file = path.resolve(process.cwd(), "src", "data", "leetcode-graph.json");
        if (fs.existsSync(file)) {
          const body = fs.readFileSync(file, "utf8");
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(body);
          return;
        }

        res.statusCode = 404;
        res.end(JSON.stringify({ error: "LeetCode data not found. Run npm run fetch-graph" }));
        return;
      }

      next();
    });
  },
});