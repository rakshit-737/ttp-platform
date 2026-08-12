/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  corePlugins: {
    // The hand-written design system in src/index.css owns base styles;
    // Tailwind supplies utilities only, so preflight stays off.
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        paper: '#fbfaf7',
        ink: '#101820',
        navy: '#1b3a6b',
        saffron: '#e8720c',
        primary: '#fbfaf7',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
