/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainWhite: "#EAEAEA",
        mainBackground: "#5E2E53",
        cardTitle: "#E1A1E9",
        logoUnderline: "#913693",
        logo: "#E856EB",
        logoName: "#431567",
        searchBackground: "#78507A",
      },
      sizes: {
        activityCard: "22rem"
      },

      animation: {
        fade: 'fadeOut 0.5s ease-in-out',
      },

      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
      }),
    },
  },
  plugins: [],
};
