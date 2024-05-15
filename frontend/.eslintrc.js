/* eslint-disable no-undef */
/* eslint-disable indent */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    eqeqeq: "error",
    "space-infix-ops": "error",
    semi: "error",
    "no-alert": "error",
    "react/prop-types": "off",
    "react/jsx-indent": ["error", 4],
    "react/jsx-indent-props": ["error", 4],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/react-in-jsx-scope": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-closing-bracket-location": [1, "line-aligned"],
    "react/jsx-closing-tag-location": "error",
    "react/jsx-curly-spacing": ["error", { when: "never", children: true }],
    "react/jsx-wrap-multilines": [
      "error",
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line",
      },
    ],
    "react/jsx-props-no-spreading": "off",

    // Custom configuration to warn against using double quotes and encourage single quotes
  },
};
