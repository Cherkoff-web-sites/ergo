/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00AD5D',
        'primary-dark': '#037D44',
        secondary: '#1A1812',
        'text-reverse': '#FFFFFF',
        'text-main': '#1A1812',
        'text-secondary': '#666666',
        'bg-light': '#F8F8F8',
        'bg-dark': '#1A1812',
        'border-light': '#E5E5E5',
        'border-dark': '#333333',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'tenor': ['Tenor Sans', 'sans-serif'],
      },
      fontSize: {
        'title-1': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'title-2': ['36px', { lineHeight: '44px', fontWeight: '400' }],
        'title-3': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      spacing: {
        'section': '80px',
        'mb-section': '80px',
      },
      maxWidth: {
        'container': '1200px',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
}
