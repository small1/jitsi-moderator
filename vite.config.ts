import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	plugins: [
		react({ plugins: [["@swc/plugin-styled-components", {}]] }),
		svgr(),
		eslint(),
	],
	server: {
		port: 3000,
	},
	build: {
		outDir: "build",
	},
	test: {
		globals: true,
		environment: "jsdom",
		css: true,
		reporters: ["verbose"],
		coverage: {
			reporter: ["text", "json", "html"],
			include: ["src/**/*"],
			exclude: [],
		},
	},
});
