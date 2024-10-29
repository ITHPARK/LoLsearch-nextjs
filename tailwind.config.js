// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // JIT 모드 활성화
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkGray: '#363742',
      },
    },
  },
  plugins: [],
}
