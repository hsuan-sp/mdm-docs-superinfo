import { verifyAuth } from '@/lib/api-utils';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const { errorResponse, context } = await verifyAuth();
    if (errorResponse) return errorResponse;

    const { claims } = context!;
    return NextResponse.json({
        isAuthenticated: true,
        user: {
            sub: claims?.sub,
            email: claims?.email,
            name: claims?.name,
        }
    });
}