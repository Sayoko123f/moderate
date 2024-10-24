/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        neutral: "var(--neutral)",
        "primary-bg": "var(--primary-bg)",
        "footer-bg": "var(--footer-bg)",
        "footer-neutral": "var(--footer-neutral)",
      },
      height: {
        appbar: "var(--appbar-height)",
      },
    },
  },
  plugins: [],
};
