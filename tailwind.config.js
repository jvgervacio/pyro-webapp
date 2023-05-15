/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        archivo: ["Archivo"],
        "work-sans": ["Work Sans"],
        lora: ["Lora"],
      },
      backgroundImage: {
        cell: "url('/src/assets/svg/cell.svg')",
      },
      colors: {
        orange_peel: "#ff8626",
        vermillion: "#FF372F",
        red_crayola: "#F11D48",
        penn_blue: "#0D113E",
        berkeley_blue: "#042B58",
        marian_blue: "#28408E",
        robin_egg_blue: "#2AC9DB",
      },
      animation: {
        slidein: "slide-in 1s ease 0s 1 reverse forwards",
        "fade-in": "fade-in 1s ease",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(50px)",
          },
        },

        "fade-in": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
