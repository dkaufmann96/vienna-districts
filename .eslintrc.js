const path = require("path");

module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },
  extends: [
    "plugin:vue/essential",
    "airbnb-base",
    "plugin:tailwind/recommended",
    "prettier",
    "prettier/vue",
    "plugin:import/recommended",
    "plugin:tailwind/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", path.resolve(__dirname, "./src")]],
        extensions: [".vue", ".js"],
      },
    },
  },
};
