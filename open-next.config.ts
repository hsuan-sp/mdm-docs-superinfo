import type { OpenNextConfig } from '@opennextjs/cloudflare';

const config: OpenNextConfig = {
    default: {
        override: {
            wrapper: "cloudflare-node",
            converter: "edge",
            incrementalCache: "dummy",
            tagCache: "dummy",
            queue: "dummy",
        },
    },
    // 💡 2026 年建議：顯式加入 edgeExternals 避免 node 核心套件報錯
    edgeExternals: [],

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