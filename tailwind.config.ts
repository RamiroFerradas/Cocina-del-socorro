import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        feedback: {
          100: "#FFF4DE",
          200: "#E1FBE7",
          300: "#EAF1FB",
          400: "#FFE4E5",
          500: "#FFC523",
          600: "#23CE51",
          700: "#4B83FF",
          800: "#FF3E3E",
          900: "#7D4900",
          1000: "#005016",
          1100: "#540001",
          1200: "#001437",
        },
      },
    },
  },
  plugins: [],
};
export default config;
