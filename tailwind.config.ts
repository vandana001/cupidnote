import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        manrope: ['var(--font-manrope)'],
        orbitron: ['var(--font-orbitron)'],
        poppins: ['var(--font-poppins)'],
        giveYouGlory: ['var(--font-give-you-glory)'],
        mynerve: ['var(--font-mynerve)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
