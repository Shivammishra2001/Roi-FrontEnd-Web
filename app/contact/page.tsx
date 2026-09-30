import type { Metadata } from 'next';
// Contact.css first, then the section components (and the Swiper CSS the logo
// slider imports) — the same stylesheet order the page has always had.
import '../../components/Contact/Contact.css';
import { getPageBySlug, constructMetadata } from '../../lib/strapi';
import SectionRenderer from '../../components/sections/SectionRenderer';
import { CONTACT_SECTIONS } from '../../components/sections/registry/contact';

// Rendered per request so edits published in Strapi show up immediately.
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('contact');
  return constructMetadata(data.seo);
}

export default async function ContactPage() {
  const data = await getPageBySlug('contact');
  return (
    <div className="contact-page-wrapper-root">
      <SectionRenderer sections={data.sections} components={CONTACT_SECTIONS} />
    </div>
  );
}
