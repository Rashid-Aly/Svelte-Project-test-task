const { Primary } = require('@storybook/blocks');
import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/**/*.{svelte,js,ts}',
    './src/**/**/*.{svelte,js,ts}',
    "./node_modules/flowbite/**/*.js",
      './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
    ],
   plugins: [require('flowbite/plugin')],
  theme: {
    extend: {
      primary: '#0284FE',
      colors: {
      primary: '#0284FE',
        brand: {
          Primary: '#0284FE',
        },
        stroke: {
          Primary:'#D4D6D9',
          Secondary: '#BFC2C7',
          Tartiary: '#ADB0B7',
        },
        BG: {
          Primary: '#FFFFFF',
          Secondary: '#F7F7F8',
          Quaternary: '#E6E7E9',
          Tartiary: '#EFEFF1',
        },
        accent: {
          Warning: '#FF922E',
          Danger: '#F66',
          success: '#15A033',
          Infoblue: '#38A0FF',
        },
        Hue: {
          Red: '#EF7474',
          Teal: '#00AC87',
          Choco: '#3D3434',
          Violet: '#6C2BD9',
        },
        primary: {
          50: '#EBF5FF',
          100: '#E1EFFE',
          400: '#76A9FA',
          500: '#3F83F8',
          600: '#1C64F2',
          700: '#1A56DB',
          800: '#1E429F',
          900: '#002A47',
        },
        gray: {
          200: 'E5E7EB',
          400: '#9CA3AF',
          500: '6B7280',
          600: '#4B5563',
          700: '#374151',
          900: '#111928',
        },
        green: {
          100: '#DEF7EC',
          400: '#31C48D',
          500: '#0E9F6E',
          700: '#046C4E',
        },
        red: {
          50: '#FDF2F2',
          400: '#F98080',
          600: '#E02424',
          700: '#C81E1E',
        },
        teal: {
          50: '#EDFAFA',
          100: '#D5F5F6',
          300: '#7EDCE2',
          400: '#16BDCA',
          800: '#05505C',
        },
        pink: {
          50: '#FDF2F8',
          400: '#F17EB8',
          800: '#99154B',
        },
        purple: {
          50: '#F6F5FF',
          500: '#9061F9',
          800: '#5521B5',
        },
        orange: {
          400: '#FF8A4C',
          500: '#FF5A1F',
        },
        yellow: {
          50: '#FDFDEA',
          500: '#C27803'
        },
        Icon: {
          White: '#FFFFFF',
          Primary: '#0D1526',
          Secondary: '#252B37',
          Tartiary: '#666C79',
        },
        Text: {
          White: '#FFFFFF',
          Primary: '#0D1526',
          Secondary: '#252B37',
          Tartiary: '#666C79',
        }
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      opacity: {
        10: '0.1',
        20: '0.2',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
        70: '0.7',
        80: '0.8',
        90: '0.9',
      },
    },
  },
  plugins: [flowbitePlugin]
}
