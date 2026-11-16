/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bmw: {
          black: "#050505",
          charcoal: "#101010",
          card: "#0d0d0d",
          border: "#222222",
          borderLight: "#333333",
          silver: "#C0C0C0",
          white: "#F5F5F5",
          blue: "#1c69d4",
          blueElectric: "#0066b1",
          blueAccent: "#38bdf8",
          redM: "#e11d48",
          darkNavy: "#0a101d",
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Neue Haas Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'monospace'],
        display: ['"Space Grotesk"', '"Syne"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      }
    },
  },
  plugins: [],
}
