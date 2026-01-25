/**
 * Tailwind Config - 2026 Responsive Design System
 * 支援 800×600 到 4K 的完整響應式設計
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "480px", // 極小螢幕
        sm: "640px", // 小型手機
        md: "768px", // 平板直向
        lg: "1024px", // 平板橫向
        xl: "1280px", // 筆電
        "2xl": "1536px", // 大螢幕
        "3xl": "2560px", // 2K/4K (自訂斷點)
        "4xl": "3840px", // 4K 超大螢幕
      },
      maxWidth: {
        "8xl": "1600px", // 2K 適用
        "9xl": "2000px", // 4K 適用
      },
      fontSize: {
        // 響應式字體（使用 clamp）
        "xs-responsive": "clamp(0.625rem, 0.75rem, 0.875rem)", // 10-14px
        "sm-responsive": "clamp(0.75rem, 0.875rem, 1rem)", // 12-16px
        "base-responsive": "clamp(0.875rem, 1rem, 1.125rem)", // 14-18px
        "lg-responsive": "clamp(1rem, 1.125rem, 1.25rem)", // 16-20px
        "xl-responsive": "clamp(1.125rem, 1.25rem, 1.5rem)", // 18-24px
        "2xl-responsive": "clamp(1.25rem, 1.5rem, 1.75rem)", // 20-28px
        "3xl-responsive": "clamp(1.5rem, 1.875rem, 2.25rem)", // 24-36px
        "4xl-responsive": "clamp(1.875rem, 2.25rem, 3rem)", // 30-48px
      },
      spacing: {
        // 統一間距系統
        compact: "0.5rem", // 8px
        normal: "1rem", // 16px
        comfortable: "1.5rem", // 24px
        spacious: "2rem", // 32px
      },
      minHeight: {
        "touch-target": "44px", // iOS 最小觸控目標
      },
      minWidth: {
        "touch-target": "44px",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "4xl": "2rem", // 32px
        "5xl": "2.5rem", // 40px
      },
      transitionDuration: {
        400: "400ms",
      },
      animation: {
        in: "fadeIn 0.3s ease-in-out",
        out: "fadeOut 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
