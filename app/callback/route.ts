import { handleSignIn } from '@logto/next/server-actions';
import { logtoConfig } from '../logto';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    try {
        await handleSignIn(logtoConfig, searchParams);
        return NextResponse.redirect(new URL('/', request.url));
    } catch (error: any) {
        if (error.digest?.startsWith('NEXT_REDIRECT') || error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        console.error('[Logto Callback Error]:', error);
        return NextResponse.redirect(new URL('/', request.url));
    }
}
