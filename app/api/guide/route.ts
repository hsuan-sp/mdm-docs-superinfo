import { verifyAuth, getLang } from '@/lib/api-utils';
import { getQAData } from "@/lib/data";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { errorResponse } = await verifyAuth();
    if (errorResponse) return errorResponse;

    const lang = getLang(request);
    const data = await getQAData(lang);

    return NextResponse.json(data, {
        headers: { 'Cache-Control': 'no-store' }
    });
}