import nextra from "nextra";

// 1. nextra() 內部只放置「內容/編譯相關」配置
const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: true,
  },
});

// 2. 所有「主題」與「Next.js 原生」配置放在這裡
export default withNextra({
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns", "framer-motion"],
  },
  reactStrictMode: true,
});
