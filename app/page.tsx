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

// "Our Blog" (sections.blog-preview) shows only when "Show on Home Page" is
// switched on in Strapi; false or missing = not rendered at all.
const isVisible = (section: Section) =>
  section.__component !== 'sections.blog-preview' || section.showBlogSection === true;

export default async function Home() {
  const data = await getPageBySlug('home');
  return <SectionRenderer sections={data.sections.filter(isVisible)} components={HOME_SECTIONS} />;
}
