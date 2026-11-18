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

const DEFAULT_SECTION_ORDER = [
  'sections.about-hero',
  'sections.about-values',
  'sections.about-ethos',
  'sections.about-pillars',
  'sections.about-StatsSection',
  'sections.about-tabs',
  'sections.about-teamSection',
  'sections.about-AboutofficesData',
  'sections.about-careers',
  'sections.about-AboutOurHistory',
  'sections.about-discovery',
];

export default async function AboutPage() {
  const data = await getPageBySlug('about-us');
  const rawSections = Array.isArray(data?.sections)
    ? data.sections.filter(
      (section) => isVisible(section) && ABOUT_SECTIONS[section.__component]
    )
    : [];

  const strapiCta = rawSections.find(
    (s) => s.__component === 'sections.about-cta' || s.__component === 'sections.about-discovery'
  );

  const sections: Section[] = DEFAULT_SECTION_ORDER.map((componentKey) => {
    if (componentKey === 'sections.about-discovery') {
      const match = rawSections.find((s) => s.__component === 'sections.about-discovery') || strapiCta;
      return match ? { ...match, __component: 'sections.about-discovery' } : { __component: 'sections.about-discovery' };
    }
    if (componentKey === 'sections.about-ethos') {
      const match = rawSections.find(
        (s) => s.__component === 'sections.about-ethos' || s.__component === 'sections.ethos'
      );
      return match ? { ...match, __component: 'sections.about-ethos' } : { __component: 'sections.about-ethos' };
    }
    if (componentKey === 'sections.about-pillars') {
      const match = rawSections.find(
        (s) => s.__component === 'sections.about-pillars' || s.__component === 'sections.about-hold-true' || s.__component === 'sections.pillars'
      );
      return match ? { ...match, __component: 'sections.about-pillars' } : { __component: 'sections.about-pillars' };
    }
    if (componentKey === 'sections.about-tabs') {
      const match = rawSections.find(
        (s) => s.__component === 'sections.about-tabs' || s.__component === 'sections.about-zmw' || s.__component === 'sections.about-partnerships' || s.__component === 'sections.tabs'
      );
      return match ? { ...match, __component: 'sections.about-tabs' } : { __component: 'sections.about-tabs' };
    }
    if (componentKey === 'sections.about-careers') {
      const match = rawSections.find(
        (s) => s.__component === 'sections.about-careers' || s.__component === 'sections.careers'
      );
      return match ? { ...match, __component: 'sections.about-careers' } : { __component: 'sections.about-careers' };
    }
    const match = rawSections.find((s) => s.__component === componentKey);
    return match || { __component: componentKey };
  });

  const knownKeys = new Set([
    ...DEFAULT_SECTION_ORDER,
    'sections.about-cta',
    'sections.about-ethos',
    'sections.ethos',
    'sections.about-pillars',
    'sections.about-hold-true',
    'sections.pillars',
    'sections.about-zmw',
    'sections.about-partnerships',
    'sections.tabs',
    'sections.careers',
    'sections.about-offices',
    'sections.about-history',
  ]);
  const extraSections = rawSections.filter((s) => !knownKeys.has(s.__component));

  return (
    <main className="about-page-main">
      <SectionRenderer sections={[...sections, ...extraSections]} components={ABOUT_SECTIONS} />
    </main>
  );
}

