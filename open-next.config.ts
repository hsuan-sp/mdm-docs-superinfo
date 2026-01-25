import type { OpenNextConfig } from '@opennextjs/cloudflare';

const config: OpenNextConfig = {
    default: {
        override: {
            wrapper: "cloudflare-node",
            converter: "edge",
            proxyExternalRequest: "fetch",
            incrementalCache: "dummy",
            tagCache: "dummy",
            queue: "dummy",
        },
    },

    // 🚀 這裡就是你的最強武器
    // 既然 jose 報錯是因為 esbuild 找不到它在 workerd 下的檔案
    // 我們直接在這裡宣告它為 External，OpenNext 的打包腳本就會跳過它
    edgeExternals: ["node:crypto", "node:buffer", "jose"],

    middleware: {
        external: true,
        override: {
            wrapper: "cloudflare-edge",
            converter: "edge",
            proxyExternalRequest: "fetch",
            incrementalCache: "dummy",
            tagCache: "dummy",
            queue: "dummy",
        },
    },
};

export default config;