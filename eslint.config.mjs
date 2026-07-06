import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "_next/**",
      "out/**",
      "build/**",
      "404/**",
      "admin/**",
      "404.html",
      "index.html",
      "index.txt",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
