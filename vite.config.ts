import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// For Git-hosted static sites: set BASE_PATH for project pages (e.g. GitHub Pages repo site).
// Example: BASE_PATH=/partner-dashboard/ or /repo-name/
// Leave unset for root hosting (e.g. custom domain or user Pages).
const base = process.env.BASE_PATH || "./";

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 5174,
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
