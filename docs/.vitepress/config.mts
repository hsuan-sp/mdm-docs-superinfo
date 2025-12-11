import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/mdm-support-site/',
  title: "MDM 與裝置管理常用問答集",
  description: "專業 Apple MDM 部署與技術支援文件",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首頁', link: '/' },
      { text: '指南', link: '/guide/01-account' },
      { text: '術語表', link: '/glossary' }
    ],

    sidebar: {
      '/guide/': [
        {
        text: 'MDM 常見問答集',
        items: [
          { text: '01. 帳號、憑證與伺服器', link: '/guide/01-account' },
          { text: '02. 裝置註冊與重置', link: '/guide/02-enrollment' },
          { text: '03. App 派送與管理', link: '/guide/03-apps' },
          { text: '04. 課堂管理 (Apple Classroom)', link: '/guide/04-classroom' },
          { text: '05. 數位學習精進方案', link: '/guide/05-digital-learning' },
          { text: '06. 硬體與故障排除', link: '/guide/06-hardware' },
          { text: '07. Mac 管理與進階', link: '/guide/07-mac' },
          { text: '08. 番外篇：教育場域實戰', link: '/guide/08-education' }
        ]
      }
      ],
      '/glossary': [
        {
          text: '參考資料',
          items: [
            { text: '零知識術語表', link: '/glossary' }
          ]
        }
      ]
    },

    footer: {
      copyright: 'Copyright © 2025 極電資訊有限公司'
    },

    search: {
      provider: 'local'
    },

    docFooter: {
      prev: '上一頁',
      next: '下一頁'
    },

    outline: {
      label: '本頁目錄'
    }
  }
})
