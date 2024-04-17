/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'palatinate_blue': { 
          DEFAULT: '#4545e8', 
          100: '#070736', 
          200: '#0d0d6b', 
          300: '#1414a1', 
          400: '#1a1ad6', 
          500: '#4545e8', 
          600: '#6a6aed', 
          700: '#8f8ff1', 
          800: '#b5b5f6', 
          900: '#dadafa' 
      }, 
      'white': { 
        DEFAULT: '#ffffff',
        100: '#333333',
        200: '#666666',
        300: '#999999',
        400: '#cccccc',
        500: '#ffffff',
        600: '#ffffff',
        700: '#ffffff',
        800: '#ffffff',
        900: '#ffffff' 
      },
      'keppel': { 
        DEFAULT: '#45b69c',
        100: '#0e241f',
        200: '#1b483e',
        300: '#296d5d',
        400: '#37917c',
        500: '#45b69c',
        600: '#68c6b0',
        700: '#8ed4c4',
        800: '#b4e2d7',
        900: '#d9f1eb' },
      'mint': { DEFAULT: '#21d19f',
        100: '#062920',
        200: '#0d533f',
        300: '#137c5f',
        400: '#1aa67e',
        500: '#21d19f',
        600: '#44e2b5',
        700: '#73e9c8',
        800: '#a1f0da',
        900: '#d0f8ed' },
      'crayola': { DEFAULT: '#f4743b',
        100: '#391303',
        200: '#722707',
        300: '#ab3a0a',
        400: '#e34e0d',
        500: '#f4743b',
        600: '#f68e61',
        700: '#f8aa88',
        800: '#fac6b0',
        900: '#fde3d7'
      },
      'transparent': 'transparent'
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [ nextui({
    defaultTheme: "light",
    addCommonColors: true, 
    defaultExtendTheme: "light",
    themes: {
      light: {
        colors: {
          'primary': { 
            DEFAULT: '#4545e8', 
            100: '#070736', 
            200: '#0d0d6b', 
            300: '#1414a1', 
            400: '#1a1ad6', 
            500: '#4545e8', 
            600: '#6a6aed', 
            700: '#8f8ff1', 
            800: '#b5b5f6', 
            900: '#dadafa' 
        }, 
        'white': { 
          DEFAULT: '#ffffff',
          100: '#333333',
          200: '#666666',
          300: '#999999',
          400: '#cccccc',
          500: '#ffffff',
          600: '#ffffff',
          700: '#ffffff',
          800: '#ffffff',
          900: '#ffffff' 
        },
        'secondary': { 
          DEFAULT: '#45b69c',
          100: '#0e241f',
          200: '#1b483e',
          300: '#296d5d',
          400: '#37917c',
          500: '#45b69c',
          600: '#68c6b0',
          700: '#8ed4c4',
          800: '#b4e2d7',
          900: '#d9f1eb' },
        'success': { DEFAULT: '#21d19f',
          100: '#062920',
          200: '#0d533f',
          300: '#137c5f',
          400: '#1aa67e',
          500: '#21d19f',
          600: '#44e2b5',
          700: '#73e9c8',
          800: '#a1f0da',
          900: '#d0f8ed' },
        'danger': { DEFAULT: '#f4743b',
          100: '#391303',
          200: '#722707',
          300: '#ab3a0a',
          400: '#e34e0d',
          500: '#f4743b',
          600: '#f68e61',
          700: '#f8aa88',
          800: '#fac6b0',
          900: '#fde3d7'
        },
        'transparent': 'transparent'
        },
      }
    }
  }) ],
}

