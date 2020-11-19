module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
  plugins: ["react", "prettier"],
  ignorePatterns: ["features/*"],
  rules: {
    "prettier/prettier": "warn",
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
  },
};
