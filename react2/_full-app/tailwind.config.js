/** @type {import('tailwindcss').Config} */
module.exports = {
  // We go up a directory from _full-app to capture all the lessons
  content: ['./index.html', '../**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
