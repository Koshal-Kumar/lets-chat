/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
     colors : {
        primary: '#2196F3',
        secondary:'#FFC107', 
        success: '#4CAF50', 
        error: '#F44336', 
        warning:  '#FF9800', 
        info:  '#00BCD4',
        neutral:'#9E9E9E',
      }
      
    },
  },
  plugins: [],
}

