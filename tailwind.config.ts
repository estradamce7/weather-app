import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // added
      colors: {
        "dark-custom": "#696969",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      msm: { max: "640px" },
      // => @media (max-width: 640px) { ... }

      mmd: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      mlg: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      mxl: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }

      m2xl: { max: "1536px" },
      // => @media (max-width: 1536px) { ... }
    },
  },
  plugins: [],
};
export default config;
