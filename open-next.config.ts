// open-next.config.ts

export default {
    // 預設 function，維持空物件即可
    default: {},

    // 定義一個名為 'edge' 的函數組
    functions: {
        edge: {
            // 1. 強制運行時為 edge
            runtime: "edge",

            // 2. 匹配所有傳入的 HTTP 請求
            patterns: ["*"],

            // 3. ⚠️ 關鍵修正：明確告知 OpenNext 這些路由的來源檔案
            // 'pages/**/*' 代表 "pages 資料夾下的所有檔案"
            // 這能滿足其內部驗證器的要求，徹底解決崩潰問題
            routes: ["pages/**/*"],
        },
    },
};