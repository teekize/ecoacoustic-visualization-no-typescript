/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#162829',
        'custom-medium': '#316459',
        'custom-light': '#316459',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to left, #162829, #316459, #162829)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["forest","cupcake"],
  },
}
