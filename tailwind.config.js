/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',   // Entry point for the main App file
    './src/**/*.{js,jsx,ts,tsx}', // Your source files in the src folder
  ],
  theme: {
    extend: {
      // You can add custom colors, fonts, etc. here
      colors: {
        'primary': '#007bff',
        'secondary': '#6c757d',
        'danger': '#dc3545',
        // Add custom colors if necessary
      },
    },
  },
  plugins: [],
};
