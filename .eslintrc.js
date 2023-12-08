module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "next/core-web-vitals", "prettier"],
  rules: {
    quotes: ["error", "single"],
    semi: ["error", "never"],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "import/order": [
      "error",
      {
        groups: [
          "external",
          "builtin",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
