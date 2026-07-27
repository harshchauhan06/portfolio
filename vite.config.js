import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    // Dev-only API route to serve local LeetCode data at /api/leetcode
    server: {
      port: 5173,
      strictPort: true,
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/leetcode')) {
          try {
            const fs = require('fs');
            const path = require('path');
            const file = path.resolve(process.cwd(), 'src', 'data', 'leetcode-graph.json');
            if (fs.existsSync(file)) {
              const body = fs.readFileSync(file, 'utf8');
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(body);
              return;
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'LeetCode data not found. Run npm run fetch-graph' }));
              return;
            }
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
            return;
          }
        }
        next();
      });
    }
});