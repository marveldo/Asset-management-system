const { addIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins : [
    addIconSelectors(['mdi', 'mdi-light']),
  ],
  theme: {
    extend: {
      fontFamily : {
        sans: ['Inter', 'Open Sans', 'Salsa', 'sans-serif'],
       },
       colors :{
         primcolor : "rgba(208, 227, 255, 1)",
         specblue : 'rgba(7, 71, 161, 1)',
         inputcolor : ' rgba(20, 119, 210, 0.67)',
         buttoncolor : ' rgba(20, 119, 210, 1)',
         searchcolor : 'rgba(20, 119, 210, 0.05)',
         searchlogocolorn : "rgba(89, 210, 218, 1)",
         dashboardcolor : "rgba(186, 214, 235, 0.65)",
         shadowcolour : "rgba(0, 0, 0, 0.25)",
         navcolour : 'rgba(20, 119, 210, 0.67)',
         shadowcolour : 'rgba(52, 52, 59, 0.7)',
         bluecolor : "rgba(186, 214, 235, 1)"
         



       },
       animation :{
         slideleft : 'slideleft 0.3s ease-in-out',
         slideright : 'slideright 0.3s ease-in-out',
         slideup : 'SlideUp 0.5s ease-out',
         rotation : 'Rotation 0.7s ease-in-out infinite'
       },
       keyframes :{
        slideleft : {
          '0%': { transform: 'translateX(90%)'},
          '100%':{transform : 'translateX(0%)'}
        },
        slideright :{
          '0%': { transform: 'translateX(-90%)'},
          '100%':{transform : 'translateX(0%)'}
        },
        SlideUp : {
          '0%' : {transform : 'translateY(90%)'},
          '100%': { transform: 'translateY(0)' }
         },
         Rotation :{
          '0%' : { transform : 'rotate(0deg)'},
          '50%': {transform: 'rotate(30deg)'},
          '100%': {transform: 'rotate(0deg)'},
         }

        
        
       }
    },
  },
  plugins: [],
}

