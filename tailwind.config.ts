import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#020203",
        tunnel: "#050507",
        graphite: "#0c0d10",
        steel: "#1a1c22",
        muted: "#6b7280",
        fog: "#9ca3af",
        bone: "#e8e6e3",
        accent: "#c4c8d0",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-dm)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-fog":
          "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(30,32,40,0.4) 0%, transparent 55%)",
        "tunnel-vignette":
          "radial-gradient(ellipse 55% 45% at 50% 50%, transparent 0%, rgba(0,0,0,0.85) 100%)",
      },
      animation: {
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "drift": "drift 20s linear infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
        drift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
