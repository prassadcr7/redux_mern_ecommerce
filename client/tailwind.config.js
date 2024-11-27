/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
   './index.html',                // Include main HTML
    './src/**/*.{js,jsx,ts,tsx}', // Add paths to your HTML and JS files
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },
      screens:{
        'xxs':'300px'
      }
    },
  },
  plugins: [],
}
