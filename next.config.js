import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

// 判斷部署環境
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
// 判斷是否在 Cloudflare 構建環境 (Cloudflare 會自動注入此變數)
const isCloudflare = process.env.CF_PAGES === "1";

export default withNextra({
  reactStrictMode: true,

  // --- 關鍵相容性設定 ---
  
  // 修改這裡：
  // 1. GitHub Actions 使用 'export'
  // 2. Cloudflare 使用 'standalone' (讓 OpenNext 找到它要的 manifest)
  // 3. 本地開發維持預設 (undefined)
  output: isGithubActions ? "export" : (isCloudflare ? "standalone" : undefined),

  images: {
    unoptimized: isGithubActions || isCloudflare, // Cloudflare 建議也開啟 unoptimized，或者使用專門的 loader
  },

  basePath: isGithubActions ? '/mdm-docs-superinfo' : '',

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        "node:fs": false,
        "node:path": false,
      };
    }
    return config;
  },
});