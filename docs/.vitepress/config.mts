import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/mdm-support-site/',
  title: "極電資訊 Apple MDM 知識庫",
  description: "全方位的 Apple 教育場域行動裝置管理指南",
  head: [
    ['link', { rel: 'icon', href: '/mdm-support-site/superinfo_favicon.jpeg' }]
  ],
  cleanUrls: true,
  themeConfig: {
    logo: '/superinfo_logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首頁', link: '/' },
      { text: '指南', link: '/guide/01-account' },
      { text: '術語表', link: '/glossary' },
      {
        text: '資源與服務',
        items: [
          {
            text: '常用連結',
            items: [
              { text: '極電資訊官網', link: 'https://www.superinfo.com.tw' },
              { text: 'Apple 教育官網', link: 'https://www.apple.com/tw/education/' },
              { text: '教育部 MDM 管理平台', link: 'https://mdm.edu.tw' },
              { text: '推動中小學數位學習精進方案入口網', link: 'https://pads.moe.edu.tw/pads_front/index.php?action=city_links' },
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
          { text: '01. 帳號、憑證與伺服器', link: '/guide/01-account' },
          { text: '02. 裝置註冊與重置', link: '/guide/02-enrollment' },
          { text: '03. App 派送與管理', link: '/guide/03-apps' },
          { text: '04. 課堂管理 (Apple Classroom)', link: '/guide/04-classroom' },
          { text: '05. 數位學習精進方案', link: '/guide/05-digital-learning' },
          { text: '06. 硬體與故障排除', link: '/guide/06-hardware' },
          { text: '07. Mac 管理專區', link: '/guide/07-mac' },
          { text: '08. 教育場域實戰 Q&A', link: '/guide/08-education' }
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
      copyright: 'Copyright © 2025 極電資訊｜Apple 授權教育經銷商 <br> 極電資訊有限公司 | 統一編號 23756990'
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
