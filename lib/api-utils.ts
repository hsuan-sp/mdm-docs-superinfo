// lib/api-utils.ts
import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { NextResponse } from 'next/server';

// 封裝驗證邏輯
export async function verifyAuth() {
    const context = await getLogtoContext(logtoConfig, { fetchUserInfo: true });

    if (!context.isAuthenticated) {
        return {
            errorResponse: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
            context: null
        };
    }

    return { errorResponse: null, context };
}

// 封裝語言處理邏輯
export function getLang(request: Request) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');
    return lang === "en" ? "en" : "zh";
}