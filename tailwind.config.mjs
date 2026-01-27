/**
 * Tailwind CSS v4 Configuration (Deprecated)
 * 
 * ⚠️ 注意：Tailwind CSS v4 採用 CSS-first 配置。
 * 主題設定已遷移至 app/globals.css 的 @theme 區塊中。
 * 此檔案保留為空配置以避免與 v4 衝突。
 */

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
