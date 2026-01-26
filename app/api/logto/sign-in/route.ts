import { signIn } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const postRedirectUri = searchParams.get('redirect') || '/';

    await signIn(logtoConfig, {
        redirectUri: `${logtoConfig.baseUrl}/callback`,
        postRedirectUri,
    });
}
