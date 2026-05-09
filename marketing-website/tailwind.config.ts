import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FDFBF7",
        "canvas-alt": "#FFF5E6",
        ink: "#0F172A",
        primary: "#FF9F1C",
        "primary-hover": "#F48C06",
        secondary: "#2EC4B6",
        coral: "#FF595E",
        sunshine: "#FFCA3A",
        sky: "#8ECAE6",
        lavender: "#CDB4DB",
      },
    },
  },
  plugins: [],
};

export default config;
