import type { Metadata } from 'next';
// Contact.css first, then the section components (and the Swiper CSS the logo
// slider imports) — the same stylesheet order the page has always had.
import '@/public/styles/Contact.css';
import { getGlobal, getPageBySlug, constructMetadata } from '../../lib/strapi';
import SectionRenderer from '../../components/sections/SectionRenderer';
import { CONTACT_SECTIONS } from '../../components/sections/registry/contact';
import { notFound } from 'next/navigation';

// Rendered per request so edits published in Strapi show up immediately.
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('contact');
  if (!data) notFound(); // unpublished or "Page Live" switched off
  return constructMetadata(data.seo);
}

export default async function ContactPage() {
  const [data, { footer }] = await Promise.all([getPageBySlug('contact'), getGlobal()]);
  if (!data) notFound(); // unpublished or "Page Live" switched off
  // The "Follow Us" icons use the site-wide links in Global → Footer → Social Media Links.
  const sections = data.sections.map((s) =>
    s.__component === 'sections.contact-form' ? { ...s, socialLinks: footer?.socialLinks ?? [] } : s
  );
  return (
    <div className="contact-page-wrapper-root">
      <SectionRenderer sections={sections} components={CONTACT_SECTIONS} />
    </div>
  );
}
