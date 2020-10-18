module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "plugin:vue/essential",
    "airbnb-base",
    "plugin:tailwind/recommended",
    "prettier",
    "prettier/vue"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
