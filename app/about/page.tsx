import type { Metadata } from 'next';
import { getPageBySlug, constructMetadata } from '../../lib/strapi';
import SectionRenderer from '../../components/sections/SectionRenderer';
import { ABOUT_SECTIONS } from '../../components/sections/registry/about';
import { notFound } from 'next/navigation';

// Pre-rendered and cached (ISR): re-built at most hourly, and right away
// when Strapi content is saved or published (app/revalidate/route.js).
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('about-us');
  if (!data) notFound(); // unpublished or "Page Live" switched off
  return constructMetadata(data.seo);
}

export default async function AboutPage() {
  const data = await getPageBySlug('about-us');
  if (!data) notFound(); // unpublished or "Page Live" switched off
  return <SectionRenderer sections={data.sections} components={ABOUT_SECTIONS} />;
}
