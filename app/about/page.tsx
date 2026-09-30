import type { Metadata } from 'next';
import { getPageBySlug, constructMetadata } from '../../lib/strapi';
import SectionRenderer from '../../components/sections/SectionRenderer';
import { ABOUT_SECTIONS } from '../../components/sections/registry/about';

// Rendered per request so edits published in Strapi show up immediately.
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('about-us');
  return constructMetadata(data.seo);
}

export default async function AboutPage() {
  const data = await getPageBySlug('about-us');
  return <SectionRenderer sections={data.sections} components={ABOUT_SECTIONS} />;
}
