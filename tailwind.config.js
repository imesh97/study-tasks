/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        nord0: "#1A2634",
        nord1: "#2B3D52",
        nord2: "#34425F",
        nord3: "#3D4F6C",
        nord4: "#D8DEE9",
        nord5: "#E5E9F0",
        nord6: "#ECEFF4",
        nord7: "#6A95A2",
        nord8: "#7AA6B5",
        nord9: "#8AB8C8",
        nord10: "#99C9DB",
        nord11: "#BF616A",
        nord12: "#D08770",
        nord13: "#EBCB8B",
        nord14: "#A3BE8C",
        nord15: "#B48EAD",
      },
    },
  },
  plugins: [],
};
