module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: { min: "360px", max: "959px" },
      md: { min: "960px", max: "1919px" },
      lg: { min: "1920px" },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugin: [],
};
