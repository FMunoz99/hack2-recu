import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";  // Este es el primer plugin a cargar

export default defineConfig({
  plugins: [
    tsconfigPaths(),  // Moverlo al principio
    react(),
    checker({
      typescript: true,
    }),
  ],
});
