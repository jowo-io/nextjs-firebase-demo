/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./client/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        "white": "#FFFFFF",
        "black": "#0d0d0d",
        "primary": "#ffe6a4",
        "primary-dark": "#ffd565",
        "primary-light": "#ffedbf",
        "secondary": "#C1C2C5",
        "secondary-dark": "#a3a4a9",
        "secondary-light": "#bfbfc3",
      },
    },
  },
  plugins: [],
};

module.exports = config;
