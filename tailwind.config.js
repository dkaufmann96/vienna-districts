module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {},
    zIndex: {
      top: 9999,
    },
  },
  variants: {},
  plugins: ["@tailwindcss/ui"],
};
