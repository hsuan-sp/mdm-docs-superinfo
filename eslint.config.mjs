import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // App Router 在 layout.tsx <head> 中使用 <link> 載入字型是官方支援的做法
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default eslintConfig;
