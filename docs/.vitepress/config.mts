import { defineConfig } from 'vitepress'

// Determing base path dynamically: 
// Use '/mdm-support-site/' for GitHub Pages (detected by GITHUB_ACTIONS env)
// Use '/' for Cloudflare Workers or local development
const base = process.env.GITHUB_ACTIONS === 'true'
  ? '/mdm-support-site/'
  : (process.env.BASE_PATH || '/')

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/mdm-support-site/' : '/',

  locales: {
    root: {
      label: '繁體中文',
      lang: 'zh-TW',
      title: "極電資訊 Apple MDM 知識庫",
      description: "全方位的 Apple 教育場域行動裝置管理指南",
      themeConfig: {
        nav: [
          { text: '首頁', link: '/' },
          { text: '指南', link: '/guide/' },
          { text: '術語表', link: '/glossary' },
          { text: '更新日誌', link: '/CHANGELOG' },
          {
            text: '資源與服務',
            items: [
              {
                text: '常用連結',
                items: [
                  { text: '極電資訊官網', link: 'https://www.superinfo.com.tw' },
                  { text: 'Apple 教育官網', link: 'https://www.apple.com/tw/education/' },
                  { text: '教育部 MDM 管理平台', link: 'https://mdm.edu.tw' },
                  { text: '推動中小學數位學習精進方案入口網', link: 'https://pads.moe.edu.tw/index.php' },
                  { text: 'Apple 平台部署指南', link: 'https://support.apple.com/zh-tw/guide/deployment/welcome/web' },
                  { text: 'Apple School Manager 使用手冊', link: 'https://support.apple.com/zh-tw/guide/apple-school-manager/welcome/web' },
                  { text: 'Jamf Pro 官方文件', link: 'https://learn.jamf.com/bundle/jamf-pro-documentation-current/page/Jamf_Pro_Documentation.html' },
                  { text: 'Jamf School 官方文件', link: 'https://learn.jamf.com/bundle/jamf-school-documentation/page/Jamf_School_Documentation.html' }
                ]
              },
              {
                text: '聯絡客服',
                items: [
                  { text: '業務客服 (Line: @406ifuui)', link: 'https://line.me/R/ti/p/@406ifuui' },
                  { text: '技術客服 (Line: @257yzoxx)', link: 'https://line.me/R/ti/p/@257yzoxx' },
                  { text: '師大 APPLE 校園體驗中心', link: 'https://page.line.me/xat.0000119425.rpn?openQrModal=true' },
                  { text: '世新 APPLE 校園體驗中心', link: 'https://page.line.me/xat.0000119425.rpn?openQrModal=true' }
                ]
              }
            ]
          }
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'MDM 常見問答集',
              items: [
                { text: '01. 帳號、憑證與伺服器', link: '/guide/#account' },
                { text: '02. 裝置註冊與重置', link: '/guide/#enrollment' },
                { text: '03. App 派送與管理', link: '/guide/#apps' },
                { text: '04. 課堂管理 (Apple Classroom)', link: '/guide/#classroom' },
                { text: '05. 數位學習精進方案', link: '/guide/#digital' },
                { text: '06. 硬體與故障排除', link: '/guide/#hardware' },
                { text: '07. Mac 管理專區', link: '/guide/#mac' },
                { text: '08. 教育場域實戰 Q&A', link: '/guide/#education' }
              ]
            }
          ]
        },
        docFooter: { prev: '上一頁', next: '下一頁' },
        outline: { label: '本頁目錄' }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: "Superinfo Apple MDM Knowledge Base",
      description: "Professional Apple MDM FAQ & Support Documentation for Education",
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Glossary', link: '/en/glossary' },
          { text: 'Changelog', link: '/en/CHANGELOG' },
          {
            text: 'Resources (Traditional Chinese Primarily)',
            items: [
              {
                text: 'External Links (ZH-TW)',
                items: [
                  { text: 'Superinfo Website', link: 'https://www.superinfo.com.tw' },
                  { text: 'Apple Education (TW)', link: 'https://www.apple.com/tw/education/' },
                  { text: 'Apple Platform Deployment (ZH)', link: 'https://support.apple.com/zh-tw/guide/deployment/welcome/web' },
                  { text: 'Apple School Manager Guide (ZH)', link: 'https://support.apple.com/zh-tw/guide/apple-school-manager/welcome/web' },
                  { text: 'Jamf Pro Documentation', link: 'https://learn.jamf.com/bundle/jamf-pro-documentation-current/page/Jamf_Pro_Documentation.html' }
                ]
              }
            ]
          }
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'MDM FAQ Guide',
              items: [
                { text: '01. Account & Server', link: '/en/guide/#account' },
                { text: '02. Enrollment & Reset', link: '/en/guide/#enrollment' },
                { text: '03. App Management', link: '/en/guide/#apps' },
                { text: '04. Apple Classroom', link: '/en/guide/#classroom' },
                { text: '05. Digital Learning', link: '/en/guide/#digital' },
                { text: '06. Hardware Tuning', link: '/en/guide/#hardware' },
                { text: '07. Mac Management', link: '/en/guide/#mac' },
                { text: '08. Education Q&A', link: '/en/guide/#education' }
              ]
            }
          ]
        },
        docFooter: { prev: 'Previous', next: 'Next' },
        outline: { label: 'On this page' }
      }
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/mdm-support-site/superinfo_favicon.jpeg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+TC:wght@400;500;700&display=swap', rel: 'stylesheet' }],
    ['meta', { name: 'keywords', content: 'Apple, MDM, Jamf Pro, Jamf School, Education, MoE, Taiwan' }],
    ['meta', { property: 'og:image', content: '/mdm-support-site/superinfo_logo.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],

  cleanUrls: true,

  vite: {
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // 移除複雜的 manualChunks 以避免 Circular chunk 錯誤
        }
      }
    },
    resolve: {
      alias: {
        'punycode': 'punycode'
      }
    }
  },

  themeConfig: {
    logo: '/superinfo_logo.png'
  }
})

