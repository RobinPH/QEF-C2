import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components/", import.meta.url)
      ),
      "@hooks": fileURLToPath(new URL("./src/hooks/", import.meta.url)),
      "@context": fileURLToPath(new URL("./src/context/", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages/", import.meta.url)),
      "@services": fileURLToPath(
        new URL("./src/utils/backend/services/", import.meta.url)
      ),
      "@types": fileURLToPath(new URL("./src/types/", import.meta.url)),
    },
  },
});
