/**
 * Contact-form leads (server only): validate, save to Strapi, email via
 * Nodemailer + Gmail SMTP. Used by app/contact/submit/route.js.
 *
 * Env (server-side only, never NEXT_PUBLIC_):
 *   EMAIL_USER     Gmail address that sends the notification
 *   EMAIL_PASS     its 16-character Google App Password
 *   MAIL_RECEIVER  where leads are sent (comma-separate several)
 *   SMTP_HOST / SMTP_PORT / SMTP_SECURE  optional: another SMTP server
 *                  instead of Gmail (e.g. for testing)
 */
import nodemailer from 'nodemailer';

const STRAPI_URL = (process.env.STRAPI_URL || 'http://localhost:1338').replace(/\/+$/, '');

const LIMITS = { name: 120, email: 254, phone: 40, message: 5000, budget: 120, service: 120, source: 500 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

/**
 * Returns `{ lead }` or `{ errors: { field: message } }`.
 * Name is required, plus an email or a phone number (the Contact page form
 * asks for phone, the blog form for both).
 */
export function validateLead(body) {
  const lead = Object.fromEntries(Object.entries(LIMITS).map(([k, max]) => [k, clean(body?.[k], max)]));
  // Headers can't contain line breaks; the name also goes into the subject.
  lead.name = lead.name.replace(/[\r\n]+/g, ' ');

  const errors = {};
  if (!lead.name) errors.name = 'Name is required.';
  if (lead.email && !EMAIL_RE.test(lead.email)) errors.email = 'Enter a valid email address.';
  if (!lead.email && !lead.phone) errors.email = 'Enter an email address or a phone number.';
  if (lead.phone && !/^[0-9+()\-.\s]{6,40}$/.test(lead.phone)) errors.phone = 'Enter a valid phone number.';

  return Object.keys(errors).length ? { errors } : { lead };
}

/** Saves the lead as a Contact Form Submission in Strapi (server to server). */
export async function saveLeadToStrapi(lead) {
  const message = [lead.message || '(No message)', lead.source && `— Sent from: ${lead.source}`].filter(Boolean).join('\n\n');
  const res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
    body: JSON.stringify({
      data: {
        fullName: lead.name,
        email: lead.email || undefined,
        phone: lead.phone || undefined,
        budget: lead.budget || undefined,
        service: lead.service || undefined,
        message,
      },
    }),
  });
  if (!res.ok) throw new Error(`Strapi returned ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

export const isMailConfigured = () =>
  Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.MAIL_RECEIVER);

let transporter = null;
function getTransporter() {
  if (!transporter) {
    const auth = { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS };
    transporter = process.env.SMTP_HOST
      ? nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth,
        })
      : nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth });
  }
  return transporter;
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function leadRows(lead) {
  return [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Budget', lead.budget],
    ['Service', lead.service],
    ['Message', lead.message],
    ['Sent from', lead.source],
  ].filter(([, v]) => v);
}

function leadEmailHtml(lead, receivedAt) {
  const rows = leadRows(lead)
    .map(([label, value]) => {
      let cell = escapeHtml(value).replace(/\n/g, '<br>');
      if (label === 'Email') cell = `<a href="mailto:${escapeHtml(value)}" style="color:#c33204;">${cell}</a>`;
      if (label === 'Phone') cell = `<a href="tel:${escapeHtml(value.replace(/[^0-9+]/g, ''))}" style="color:#c33204;">${cell}</a>`;
      if (label === 'Sent from' && /^https?:\/\//.test(value)) cell = `<a href="${escapeHtml(value)}" style="color:#c33204;">${cell}</a>`;
      return `<tr>
        <td style="padding:12px 16px;border-bottom:1px solid #eeeeec;width:120px;vertical-align:top;font:600 13px Arial,sans-serif;color:#6b6b6b;text-transform:uppercase;letter-spacing:.04em;">${label}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #eeeeec;vertical-align:top;font:15px/1.5 Arial,sans-serif;color:#1a1a1a;">${cell}</td>
      </tr>`;
    })
    .join('');

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f4f2;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e6e6e3;">
    <tr><td style="background:#1a1a1a;padding:20px 24px;">
      <div style="font:700 18px Arial,sans-serif;color:#ffffff;">New website enquiry</div>
      <div style="font:13px Arial,sans-serif;color:#f5c24b;margin-top:4px;">ROI Mantra · ${escapeHtml(receivedAt)}</div>
    </td></tr>
    <tr><td style="padding:8px 8px 4px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </td></tr>
    <tr><td style="padding:16px 24px 22px;font:13px/1.5 Arial,sans-serif;color:#6b6b6b;">
      ${lead.email ? 'Reply to this email to answer the lead directly.' : 'No email address given; contact the lead by phone.'}
      Also saved in the CMS under Contact Form Submissions.
    </td></tr>
  </table>
</body></html>`;
}

/** Emails the lead to MAIL_RECEIVER; replying goes straight to the lead. */
export async function sendLeadEmail(lead) {
  const receivedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + ' IST';
  const text = leadRows(lead).map(([label, value]) => `${label}: ${value}`).join('\n');
  return getTransporter().sendMail({
    from: { name: 'ROI Mantra Website', address: process.env.EMAIL_USER },
    to: process.env.MAIL_RECEIVER,
    ...(lead.email ? { replyTo: { name: lead.name, address: lead.email } } : {}),
    subject: `New enquiry from ${lead.name}`,
    text: `New website enquiry (${receivedAt})\n\n${text}\n`,
    html: leadEmailHtml(lead, receivedAt),
  });
}
