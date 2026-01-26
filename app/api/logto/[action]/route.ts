import { signIn, signOut, handleSignIn, getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ action: string }> }
) {
    const { action } = await params;

    if (action === 'sign-in') {
        const searchParams = request.nextUrl.searchParams;
        const postRedirectUri = searchParams.get('redirect') || '/';
        return await signIn(logtoConfig, {
            redirectUri: `${logtoConfig.baseUrl}/api/logto/callback`,
            postRedirectUri,
        });
    }

    if (action === 'sign-out') {
        return await signOut(logtoConfig);
    }

    if (action === 'callback') {
        try {
            await handleSignIn(logtoConfig, new URL(request.url));
        } catch (error: any) {
            // Next.js redirect () 實際上是透過丟出一個特殊 error 來運作的
            // 我們不應該捕捉它，否則跳轉會失效
            if (error.digest?.startsWith('NEXT_REDIRECT') || error.message === 'NEXT_REDIRECT') {
                throw error;
            }
            console.error('[Logto Callback Error]:', error);
            return NextResponse.json({
                error: 'Authentication failed',
                message: error instanceof Error ? error.message : String(error)
            }, { status: 500 });
        }
    }

    if (action === 'user') {
        const context = await getLogtoContext(logtoConfig);
        return NextResponse.json(context);
    }

    return new Response('Action Not Found', { status: 404 });
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ action: string }> }
) {
    const { action } = await params;
    if (action === 'sign-out') {
        return await signOut(logtoConfig);
    }
    return new Response('Method Not Allowed', { status: 405 });
}