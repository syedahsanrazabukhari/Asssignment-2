/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        heartbeat: { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.3)' } },
        twinkle: { '0%,100%': { opacity: 0.3, transform: 'scale(1)' }, '50%': { opacity: 1, transform: 'scale(1.2)' } },
        floatUp: { '0%': { transform: 'translateY(100vh) scale(0.7)', opacity: 0 }, '10%': { opacity: 1 }, '90%': { opacity: 1 }, '100%': { transform: 'translateY(-100px) scale(1.3)', opacity: 0 } },
        spotlightPulse: { '0%,100%': { opacity: 0.5 }, '50%': { opacity: 0.9 } },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        heartbeat: 'heartbeat 1.5s infinite',
        twinkle: 'twinkle 1.5s infinite ease-in-out',
        floatUp: 'floatUp 15s linear infinite',
        spotlightPulse: 'spotlightPulse 4s infinite',
      },
    },
  },
  plugins: [],
};
