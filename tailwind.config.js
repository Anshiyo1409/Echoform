/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07080C',
          900: '#0B0D14',
          850: '#10131F',
          800: '#161B2E',
          700: '#202740',
          600: '#2E3859',
        },
        cyber: {
          cyan: '#00F0FF',
          purple: '#8B5CF6',
          pink: '#EC4899',
          amber: '#F59E0B',
          emerald: '#10B981',
          blue: '#3B82F6',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave-bar': 'waveBar 1.2s ease-in-out infinite alternate',
        'glow-spin': 'glowSpin 6s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        waveBar: {
          '0%': { height: '15%' },
          '100%': { height: '100%' },
        },
        glowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
