module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
