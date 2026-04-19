import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1B2A4A",
        gold: "#C9A84C",
        cream: "#F5F0E8",
      },
      fontFamily: {
        serif: ["Playfair Display", "Times New Roman", "serif"],
        sans: ["Inter", "Segoe UI", "Arial", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)", opacity: "0.6" },
          "50%": { transform: "translateY(-12px)", opacity: "1" },
        },
        "border-trace": {
          "0%": { opacity: "0.4", boxShadow: "0 0 0 rgba(201,168,76,0.2)" },
          "50%": { opacity: "1", boxShadow: "0 0 24px rgba(201,168,76,0.4)" },
          "100%": { opacity: "0.6", boxShadow: "0 0 0 rgba(201,168,76,0.2)" },
        },
        ripple: {
          "0%": { width: "0", height: "0", opacity: "0.6" },
          "100%": { width: "240px", height: "240px", opacity: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.85" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "border-trace": "border-trace 1.6s ease-in-out infinite",
        ripple: "ripple 0.7s ease-out",
        "pulse-slow": "pulse-slow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
