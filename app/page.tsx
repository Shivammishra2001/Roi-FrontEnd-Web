import type { Metadata } from 'next';
import type { Section } from '../types/strapi';
import { getPageBySlug, constructMetadata } from '../lib/strapi';
import SectionRenderer from '../components/sections/SectionRenderer';
import { HOME_SECTIONS } from '../components/sections/registry/home';
import '@/public/styles/HomeCss.css';
import { notFound } from 'next/navigation';

// Pre-rendered and cached (ISR): re-built at most hourly, and right away
// when Strapi content is saved or published (app/revalidate/route.js).
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('home');
  if (!data) notFound(); // unpublished or "Page Live" switched off
  return constructMetadata(data.seo);
}

// Each home section has a "Show on Page" switch in Strapi (isEnabled); a
// section switched off is not rendered at all. Missing = shown.
const isVisible = (section: Section) => (section as { isEnabled?: boolean }).isEnabled !== false;

export default async function Home() {
  const data = await getPageBySlug('home');
  if (!data) notFound(); // unpublished or "Page Live" switched off
  const sections = Array.isArray(data?.sections) ? data.sections.filter(isVisible) : [];
  return <SectionRenderer sections={sections} components={HOME_SECTIONS} />;
}
