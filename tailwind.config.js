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
      fontFamily: {
        kanit: ['Kanit', 'serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.font-optical-sizing-auto': {
          'font-optical-sizing': 'auto',
        },
        '.font-elsh-0': {
          'font-variation-settings': '"ELSH" 0',
        },
      })
    },
  ],
}
