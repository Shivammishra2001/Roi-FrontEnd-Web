import type { Metadata } from 'next';
import { getPageBySlug, constructMetadata } from '../lib/strapi';
import SectionRenderer from '../components/sections/SectionRenderer';
import '../components/Home/HomeCss.css';

// Strapi is fetched with cache: 'no-store' — force this route to render
// dynamically on every request instead of being frozen as static output
// at build time, so CMS edits show up immediately on refresh.
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('home');
  return constructMetadata(data.seo);
}

export default async function Home() {
  const data = await getPageBySlug('home');
  return <SectionRenderer sections={data.sections} />;
}
