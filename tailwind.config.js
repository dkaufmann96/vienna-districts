const tailwindcssUi = require("@tailwindcss/ui");

module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {},
    zIndex: {
      top: 9999,
    },
  },
  variants: {},
  plugins: [tailwindcssUi],
};
