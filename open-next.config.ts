// open-next.config.ts

// 這裡不需要任何 import
export default {
    // 1. 設定預設的 function
    default: {},

    // 2. 新增一個 functions 區塊，明確告訴 OpenNext 我們要用 Edge
    functions: {
        edge: {
            // 3. 強制所有路由 (*) 都跑在 edge runtime
            runtime: "edge",
            patterns: ["*"],
        },
    },
};