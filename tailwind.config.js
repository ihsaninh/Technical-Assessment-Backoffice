const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: '#3f51b5',
    }
  },
  plugins: [],
}
