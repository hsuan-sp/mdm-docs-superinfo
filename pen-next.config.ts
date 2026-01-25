// open-next.config.ts
import { type Node, type Function, type Bundle } from 'open-next/types';

export default {
    functions: {
        // 'default' 指的是所有 API Routes 和 pages
        default: {
            // 強制所有 function 在 Cloudflare Edge 上運行
            runtime: "edge",
        },
    },
};