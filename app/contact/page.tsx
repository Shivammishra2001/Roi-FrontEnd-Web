import type { Metadata } from 'next';
// Contact.css first, then the section components (and the Swiper CSS the logo
// slider imports) — the same stylesheet order the page has always had.
import '@/public/styles/Contact.css';
import { getPageBySlug, constructMetadata } from '../../lib/strapi';
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
  const data = await getPageBySlug('contact');
  if (!data) notFound(); // unpublished or "Page Live" switched off
  return (
    <div className="contact-page-wrapper-root">
      <SectionRenderer sections={data.sections} components={CONTACT_SECTIONS} />
    </div>
  );
}
