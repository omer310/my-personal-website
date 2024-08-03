module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        grid: "grid 15s linear infinite",
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        neugray: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#d6d6d6',
          300: '#b8b8b8',
          400: '#9e9e9e',
          500: '#8c8c8c',
          600: '#787878',
          700: '#646464',
          800: '#525252',
          900: '#404040',
        },
      },
      boxShadow: {
        'neumorph': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
        'neumorph-inset': 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff',
        'neumorph-dark': '5px 5px 10px #1a1a1a, -5px -5px 10px #2e2e2e',
        'neumorph-inset-dark': 'inset 5px 5px 10px #1a1a1a, inset -5px -5px 10px #2e2e2e',
        'neumorph-light': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
        'neumorph-light-inset': 'inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff',
      },
    },
  },
  plugins: [],
}