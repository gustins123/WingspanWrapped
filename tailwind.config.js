/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('./assets/images/watercolor-blue.webp')",
        'hue-rotate-90': 'hue-rotate(90deg)',
      },
    },
  },
  plugins: [],
}

