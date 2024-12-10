/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,html}"],
  theme: {},
  plugins: [require("tailwindcss-animate")],
  darkMode: ["class"],
}