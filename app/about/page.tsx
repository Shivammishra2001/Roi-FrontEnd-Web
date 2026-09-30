import type { Metadata } from 'next';
import { getPageBySlug, constructMetadata } from '../../lib/strapi';
import About from '../../components/About/About.jsx';

// No CMS content exists for About yet (empty `sections`, per the unified
// Pages seed) — only SEO is wired here. The page body stays exactly the
// static <About /> it already was, untouched.
export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('about-us');
  return constructMetadata(data.seo);
}

export default function AboutPage() {
  return <About />;
}
