import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,

  // Custom rules for better code quality
  {
    rules: {
      // React/Next.js specific
      "react/prop-types": "off", // Not needed with modern React
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // General code quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-debugger": "warn",
      "prefer-const": "warn",
      "no-var": "error",

      // Code style
      semi: ["error", "always"],
      quotes: ["warn", "double", { avoidEscape: true }],
      "comma-dangle": ["warn", "only-multiline"],
      "object-curly-spacing": ["warn", "always"],
      "array-bracket-spacing": ["warn", "never"],

      // Best practices
      eqeqeq: ["error", "always"],
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-return-await": "warn",
      "require-await": "warn",

      // Accessibility
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
    },
  },

  // Override default ignores of eslint-config-next
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Additional ignores:
    "node_modules/**",
    "coverage/**",
    ".swc/**",
    "*.config.js",
    "*.config.mjs",
  ]),
]);

export default eslintConfig;
