/**
 * POST /contact/submit — contact-form leads from the Contact page and the
 * blog post sidebar. Saves the lead in Strapi (Contact Form Submissions),
 * then emails it (lib/contactLead.js).
 *
 * Not under /api: in production Nginx sends every /api/* request to Strapi,
 * so a Next.js route there would never be reached.
 *
 * Body (JSON): name (required), email and/or phone (one required), message,
 * budget, service, source (page the form was sent from), website (spam trap,
 * must be empty).
 *
 * 200 { success: true }        lead saved and/or emailed
 * 400 { success: false, errors } invalid input
 * 429                           too many submissions from one IP
 * 500 { success: false }       neither saved nor emailed
 */
import { NextResponse } from 'next/server';
import { validateLead, saveLeadToStrapi, sendLeadEmail, isMailConfigured } from '../../../lib/contactLead';

export const dynamic = 'force-dynamic';

// Per-IP limit (in memory: one PM2 process) so the form can't be used to flood the inbox.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [key, times] of hits) if (now - times[times.length - 1] > WINDOW_MS) hits.delete(key);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, errors: { form: 'Invalid request.' } }, { status: 400 });
  }

  // Bots fill every field; people never see this one. Pretend it worked.
  if (body?.website) return NextResponse.json({ success: true });

  // Nginx sets X-Real-IP and appends the client address to the END of
  // X-Forwarded-For; earlier entries come from the client and can be faked.
  const ip =
    request.headers.get('x-real-ip') ||
    (request.headers.get('x-forwarded-for') || '').split(',').pop().trim() ||
    'local';
  if (rateLimited(ip)) {
    return NextResponse.json(
      { success: false, errors: { form: 'Too many messages. Please try again in a few minutes.' } },
      { status: 429 }
    );
  }

  const { lead, errors } = validateLead(body);
  if (errors) return NextResponse.json({ success: false, errors }, { status: 400 });

  // Save first, then email; the lead counts as received if either works.
  let saved = false;
  let emailed = false;
  try {
    await saveLeadToStrapi(lead);
    saved = true;
  } catch (err) {
    console.error('[contact] could not save lead to Strapi:', err instanceof Error ? err.message : err);
  }
  if (isMailConfigured()) {
    try {
      await sendLeadEmail(lead);
      emailed = true;
    } catch (err) {
      console.error('[contact] could not send lead email:', err instanceof Error ? err.message : err);
    }
  } else {
    console.warn('[contact] EMAIL_USER / EMAIL_PASS / MAIL_RECEIVER not set; lead not emailed.');
  }

  if (!saved && !emailed) return NextResponse.json({ success: false }, { status: 500 });
  return NextResponse.json({ success: true });
}
