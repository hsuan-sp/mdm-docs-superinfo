import nextra from 'nextra'

// 1. nextra() 內部只放置「內容/編譯相關」配置
const withNextra = nextra({
  latex: true,
  // Nextra 4 中，flexsearch 是一個布林值或特定對象，且不能放在頂層 config
  search: {
    codeblocks: true
  }
})

// 2. 所有「主題」與「Next.js 原生」配置放在這裡
export default withNextra({
  
  experimental: {
    turbo: {
      rules: {
        '*.css': {
          loaders: ['postcss-loader'],
          as: 'css'
        }
      }
    }
  },
  reactStrictMode: true,
})