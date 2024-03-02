import postcss from "./postcss.config.js";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import builtins from "rollup-plugin-node-builtins";
import sveltePreprocess from "svelte-preprocess";
const builtinsPlugin = builtins({ crypto: true });
builtinsPlugin.name = "builtins";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        postcss: true,
      }),
    }),
  ],
  css: {
    postcss,
  },
});
