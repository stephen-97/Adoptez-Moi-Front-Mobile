module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "jsx-a11y", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/self-closing-comp": "off",
    "react/destructuring-assignment": "off",
    "import/prefer-default-export": "off",
    "react/no-children-prop": "off",
    // 'linebreak-style': ["error", "windows"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-use-before-define": [
      "error",
      { functions: true, classes: true, variables: false },
    ], // disable the rule for variables, but enable it for functions and classes
    "react/prop-types": "off", // disable prevent missing props validation
  },
};
