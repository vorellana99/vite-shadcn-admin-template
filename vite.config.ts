import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "lucide-react": ["lucide-react"],
          "recharts": ["recharts"],
          "tanstack-table": ["@tanstack/react-table"],
          "radix-ui": ["radix-ui", "@radix-ui/react-collapsible"],
          "dnd-kit": ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities", "@dnd-kit/modifiers"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
