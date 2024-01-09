/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      screens: {
        // xs: "500px",
        xs: "375px",
      },
      height: {
        screen: "100dvh",
      },
      width: {
        screen: "100dvw",
      },
    },
  },
  plugins: [],
};
