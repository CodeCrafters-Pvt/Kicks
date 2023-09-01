/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: ['var(--font-mont)'],
        mono: ['var(--font-roboto-mono)'],
        general: ['"Inter"', 'sans-serif'],
        heading:['"Raleway"','sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors:{
        dark: "#1b1b1b",
        light: "#FFFFFF",
        primary: "#E86464",
        secondary:"#d6d6d6",
        accent:"#ff5c5c",
        text:"#3d4340",
        background:"#f5f5f5",
        userMgtBg:"#FFECEC",
        primaryDark: "#58E6D9",
        secondaryDark: "#58E6D9",
        inputOnFocus: "#c7c6eb",
        textNormal: "#1E1E1E"
      },
      screens: {
        "2xl": { max: "1535px" },
        "xl": { max: "1279px" },
        "lg": { max: "1023px" },
        "md": { max: "767px" },
        "sm": { max: "639px" },
        "xs": { max: "479px" },
    },
    },
  },
  plugins: [],
}

