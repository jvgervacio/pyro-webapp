/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'montserrat': ['Montserrat'],
        'archivo': ['Archivo'],
        'work-sans': ['Work Sans'],
        'lora': ['Lora'],
      },
      backgroundImage: {
        'cell': "url('/src/assets/svg/cell.svg')"
        
      },
      colors:{
        maximum_yellow_red: "#ffbf47", 
        portland_orange: "#FD5635",
        imperial_red: "#FF0A3B",
        red_ncs: "#BF0D31",
        eerie_black: "#151515"
      },
      animation: {
        'slidein': 'slide-in 1s ease 0s 1 reverse forwards',
        'fade-in': 'fade-in 1s ease'
      },
      keyframes:{
        'slide-in':{
          '0%':{
            opacity: '1',
            transform: 'translateY(0px)'
          },
          '100%':{
            opacity: '0',
            transform: 'translateY(100px)'
            
          }
        },

        'fade-in':{
          'from':{
            opacity: '0',
           
          },
          'to':{
            opacity: '1',
          }
        }
      },
      
    },
  },
  plugins: [require("tailwindcss-animation-delay"),],
}

