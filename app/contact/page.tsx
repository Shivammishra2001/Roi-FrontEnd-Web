import type { Metadata } from 'next';
import { getPageBySlug, constructMetadata } from '../../lib/strapi';
import Contact from '../../components/Contact/Contact.jsx';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('contact');
  return constructMetadata(data.seo);
}

export default async function ContactPage() {
  const data = await getPageBySlug('contact');
  return <Contact data={data} />;
}
