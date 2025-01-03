/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        secondary: '#00CCFF', 
        danger: '#e3342f',
        blue:'#3381FF',
        green: {
          500: '#22c55e', // Custom green 
        },
        gray: {
          500: '#6b7280', // Custom gray
        },
      },
    },
  },
  plugins: [],
}

