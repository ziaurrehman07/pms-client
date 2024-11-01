/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#ffffff',
          text: '#000000',
        },
        dark: {
          background: '#000000',
          text: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}
