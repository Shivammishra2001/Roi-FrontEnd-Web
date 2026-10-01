import type { Metadata } from 'next';
import type { Section } from '../types/strapi';
import { getPageBySlug, constructMetadata } from '../lib/strapi';
import SectionRenderer from '../components/sections/SectionRenderer';
import { HOME_SECTIONS } from '../components/sections/registry/home';
import '../components/Home/HomeCss.css';

// Strapi is fetched with cache: 'no-store' — force this route to render
// dynamically on every request instead of being frozen as static output
// at build time, so CMS edits show up immediately on refresh.
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('home');
  return constructMetadata(data.seo);
}

// Each home section has a "Show on Page" switch in Strapi (isEnabled); a
// section switched off is not rendered at all. Missing = shown.
const isVisible = (section: Section) => (section as { isEnabled?: boolean }).isEnabled !== false;

export default async function Home() {
  const data = await getPageBySlug('home');
  return <SectionRenderer sections={data.sections.filter(isVisible)} components={HOME_SECTIONS} />;
}
