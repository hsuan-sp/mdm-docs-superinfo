import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Use fetchUserInfo: true to get full details (email, name, etc.)
    const context = await getLogtoContext(logtoConfig, { fetchUserInfo: true });
    return NextResponse.json(context);
}
