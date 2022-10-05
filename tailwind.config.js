const corporateTheme = require('daisyui/src/colors/themes')['[data-theme=corporate]']

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      lineHeight: {
        12: '3rem',
      },
      minHeight: {
        10: '2.5rem',
      },
    },
  },
  daisyui: {
    themes: [
      {
        corporate: {
          ...corporateTheme,
          '--rounded-btn': '0.625rem',
          'base-200': '#f5f6f8',
        },
      },
      {
        darkCorporate: {
          ...require('daisyui/src/colors/themes')['[data-theme=business]'],
          neutral: '#23223F',
          'base-100': '#3A3C4B',

          primary: corporateTheme.primary,
          secondary: corporateTheme.secondary,
          accent: corporateTheme.accent,

          '--rounded-btn': '0.625rem',
        },
      },
    ],
    darkTheme: 'darkCorporate',
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
