/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: { 
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
    white: { 
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
    secondary: { 
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
    'transparent': 'transparent',
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
};
// eslint-disable-next-line no-undef
export const plugins = [require("tailwindcss-animate")];

