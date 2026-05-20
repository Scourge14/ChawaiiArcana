import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F1E8",
        pearl: "#FFF9F0",
        "pearl-soft": "#EFE4D4",
        ink: "#142033",
        "ink-soft": "#4B5563",
        "ink-muted": "#6B6258",
        "ink-disabled": "#A79D91",
        champagne: "#C9A45C",
        "champagne-soft": "#E4C987",
        "champagne-dark": "#9C7431",
        sage: "#6F8376",
        "sage-hover": "#5E7166",
        "sage-active": "#4F6258",
        mauve: "#8E5572",
        "mauve-hover": "#7B4863",
        "mauve-soft": "#F0DDE6",
        clay: "#B7795E"
      },
      boxShadow: {
        aura: "0 24px 80px rgba(20, 34, 56, 0.14)",
        card: "0 12px 30px rgba(20, 34, 56, 0.10)",
        gold: "0 0 0 1px rgba(201, 164, 92, 0.28), 0 18px 50px rgba(201, 164, 92, 0.2)",
        mauve: "0 22px 70px rgba(164, 95, 132, 0.16)"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
