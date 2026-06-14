import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        app: "var(--bg-app)",
        card: "var(--bg-card)",
        cardElevated: "var(--bg-card-elevated)",
        parchment: "var(--bg-parchment)",
        parchmentAlt: "var(--bg-parchment-alt)",
        safety: "var(--bg-safety)",
        text: "var(--text-primary)",
        muted: "var(--text-secondary)",
        accent: "var(--accent-primary)",
        accentHover: "var(--accent-primary-hover)",
        sage: "var(--accent-secondary)",
        latin: "var(--text-latin)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        label: "var(--font-label)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        amber: "var(--shadow-amber-focus)",
        glow: "var(--shadow-amber-glow)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      letterSpacing: {
        display: "var(--tracking-display)",
        widest: "var(--tracking-widest)",
      },
      transitionTimingFunction: {
        apothecary: "ease",
      },
    },
  },
  plugins: [],
};

export default config;
