/**
 * POST /revalidate — clears the cached pages so Strapi edits show up on the
 * next page load. Called by the Strapi backend whenever content is saved,
 * published, unpublished or deleted (src/index.ts there), with the shared
 * secret from REVALIDATE_SECRET in the `x-revalidate-secret` header.
 *
 * Pages are cached (ISR) and otherwise re-built at most hourly.
 */
import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { STRAPI_CACHE_TAG } from '../../lib/strapi';

export const dynamic = 'force-dynamic';

function validSecret(given) {
    const expected = process.env.REVALIDATE_SECRET || '';
    if (!expected || typeof given !== 'string') return false;
    const a = Buffer.from(given);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request) {
    if (!validSecret(request.headers.get('x-revalidate-secret'))) {
        return NextResponse.json({ revalidated: false }, { status: 401 });
    }
    // Expire now (not stale-while-revalidate), so the very next visit is fresh.
    revalidateTag(STRAPI_CACHE_TAG, { expire: 0 });
    revalidatePath('/', 'layout');
    return NextResponse.json({ revalidated: true, now: Date.now() });
}
