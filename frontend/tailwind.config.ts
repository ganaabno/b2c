import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    maxWidth: {
      "8xl": "96rem",
      "9xl": "120rem",
    },
  },
  plugins: [],
} satisfies Config;
