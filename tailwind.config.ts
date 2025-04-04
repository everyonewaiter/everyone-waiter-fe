/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: { min: "360px", max: "959px" },
      md: { min: "960px", max: "1919px" },
      lg: { min: "1920px" },
    },
    extend: {
      colors: {
        primary: "#F22020",
        point: "#FF8E8E",
        gray: {
          "0": "#222222",
          100: "#333333",
          200: "#555555",
          300: "#999999",
          400: "#C1C1C1",
          500: "#DADADA",
          600: "#E7E7E7",
          700: "#F7F7F7",
        },
        white: "#ffffff",
        black: "#000000",
        opacity: {
          100: "#00000060",
          200: "#ffffff04",
          300: "#00000030",
        },
        status: {
          error: "#D02006",
          warning: "#F0D36A",
          success: "#6BD876",
          info: "#61B1EA",
          component: "#FF9000",
        },
        bgColor: "#161616",
        bgContent: "#1A1A1A",
      },
      fontSize: {
        xxs: ["10px", { lineHeight: "1.5" }],
        xs: ["12px", { lineHeight: "1.5" }],
        s: ["13px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.5" }],
        lg: ["18px", { lineHeight: "1.5" }],
        xl: ["20px", { lineHeight: "1.4" }],
        "2xl": ["24px", { lineHeight: "1.4" }],
        "3xl": ["32px", { lineHeight: "1.3" }],
        "4xl": ["40px", { lineHeight: "1.3" }],
      },
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "800",
      },
    },
  },
  plugin: [],
};
