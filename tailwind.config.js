/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        bone: {
          50: "#FBF8F3",
          100: "#F5F0E8",
          200: "#EBE3D5",
          300: "#DDD0BA",
          400: "#C9B89A",
        },
        ink: {
          900: "#14110F",
          800: "#1C1917",
          700: "#2A2420",
          600: "#4A423D",
          500: "#6E645C",
          400: "#968A80",
        },
        ember: {
          50: "#FBEFE9",
          100: "#F5D8CA",
          300: "#E09478",
          500: "#C2593F",
          600: "#A8432B",
          700: "#8B3A2F",
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      backgroundImage: {
        "radial-soft":
          "radial-gradient(ellipse at top, rgba(224,148,120,0.14), transparent 60%)",
        "grain":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 20px 60px -20px rgba(28, 25, 23, 0.18), 0 6px 20px -10px rgba(28, 25, 23, 0.12)",
        card:
          "0 1px 0 0 rgba(255,255,255,0.8) inset, 0 30px 80px -30px rgba(28, 25, 23, 0.25), 0 10px 30px -15px rgba(28, 25, 23, 0.12)",
        soft: "0 20px 60px -30px rgba(28, 25, 23, 0.3)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
