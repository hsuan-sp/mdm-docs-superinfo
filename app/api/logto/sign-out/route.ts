import { signOut } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';

export const dynamic = 'force-dynamic';

export async function GET() {
    await signOut(logtoConfig);
}
