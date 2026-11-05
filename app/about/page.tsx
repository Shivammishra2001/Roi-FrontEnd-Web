import type { Metadata } from 'next';
import type { Section } from '../../types/strapi';
import { getPageBySlug, constructMetadata } from '../../lib/strapi';
import SectionRenderer from '../../components/sections/SectionRenderer';
import { ABOUT_SECTIONS } from '../../components/sections/registry/about';
import '@/public/styles/About.css';

// Rendered per request so edits published in Strapi show up immediately.
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('about-us');
  return constructMetadata(data?.seo ?? null);
}

const isVisible = (section: Section) => (section as { isEnabled?: boolean }).isEnabled !== false;

// One slot per block on the page, in display order. A Strapi section fills the
// slot when its component is the canonical key or one of the older aliases;
// otherwise the block renders with its built-in text, so the page never has
// gaps. Sections Strapi sends that match no slot are appended at the end.
const SLOTS: string[][] = [
  ['sections.about-hero'],
  ['sections.about-manifesto'],
  ['sections.about-ethos', 'sections.ethos'],
  ['sections.about-pillars', 'sections.about-hold-true', 'sections.pillars'],
  ['sections.about-stats', 'sections.about-StatsSection'],
  ['sections.about-tabs', 'sections.about-zmw', 'sections.about-partnerships', 'sections.tabs'],
  ['sections.about-team', 'sections.about-teamSection'],
  ['sections.about-offices', 'sections.about-AboutofficesData'],
  ['sections.about-careers', 'sections.careers'],
  ['sections.about-history', 'sections.about-AboutOurHistory'],
  ['sections.about-cta', 'sections.about-discovery'],
];

export default async function AboutPage() {
  const data = await getPageBySlug('about-us');
  const rawSections = Array.isArray(data?.sections)
    ? data.sections.filter(
      (section) => isVisible(section) && ABOUT_SECTIONS[section.__component]
    )
    : [];

  const sections: Section[] = SLOTS.map(([canonical, ...aliases]) => {
    const keys = [canonical, ...aliases];
    const match = rawSections.find((s) => keys.includes(s.__component));
    return match ? { ...match, __component: canonical } : { __component: canonical };
  });

  const slotKeys = new Set(SLOTS.flat());
  const extraSections = rawSections.filter((s) => !slotKeys.has(s.__component));

  return (
    <main className="about-page-main">
      <SectionRenderer sections={[...sections, ...extraSections]} components={ABOUT_SECTIONS} />
    </main>
  );
}

