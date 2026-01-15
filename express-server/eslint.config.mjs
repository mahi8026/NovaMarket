import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        // Node.js globals
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
      },
    },
    rules: {
      // Error prevention
      "no-console": "off", // Allow console in backend
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-debugger": "warn",
      "no-undef": "error",
      "no-unreachable": "error",

      // Code quality
      "prefer-const": "warn",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-eval": "error",
      "no-implied-eval": "error",

      // Code style
      semi: ["error", "always"],
      quotes: ["warn", "double", { avoidEscape: true }],
      "comma-dangle": ["warn", "only-multiline"],
      "object-curly-spacing": ["warn", "always"],
      "array-bracket-spacing": ["warn", "never"],
      indent: ["warn", 2, { SwitchCase: 1 }],

      // Best practices
      "no-return-await": "warn",
      "require-await": "warn",
      "no-throw-literal": "error",
      "prefer-promise-reject-errors": "error",

      // Security
      "no-new-func": "error",
      "no-new-require": "error",
    },
  },
  {
    ignores: [
      "node_modules/**",
      "coverage/**",
      "dist/**",
      "build/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
];
