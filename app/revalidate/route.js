import { revalidatePath } from 'next/cache';

// On-demand refresh for a Strapi webhook, so CMS edits appear immediately
// instead of after the 60 s ISR window (see deploy/DEPLOYMENT.md, "Instant
// CMS updates"). Lives outside /api because Nginx sends /api to Strapi.
export async function POST(request) {
    const secret = process.env.REVALIDATE_SECRET;
    if (!secret || request.headers.get('x-revalidate-secret') !== secret) {
        return Response.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
    }

    // Header/footer live in the root layout, so refresh every page.
    revalidatePath('/', 'layout');
    return Response.json({ revalidated: true, at: new Date().toISOString() });
}
