module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Dodaj ovo za monorepo pakete
    "../../packages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'melektron-purple': '#8A2BE2',
        'quantum-blue': '#00FFFF',
        'ton-orange': '#FFA500'
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'exo': ['Exo 2', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ],
}