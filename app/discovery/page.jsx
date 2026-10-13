import { getPageBySlug, constructMetadata } from '../../lib/strapi';
import SectionRenderer from '../../components/sections/SectionRenderer';
import { DISCOVERY_SECTIONS } from '../../components/sections/registry/discovery';
import Discovery from '../../components/Discovery/Discovery';
import { notFound } from 'next/navigation';

// Rendered per request so edits published in Strapi show up immediately.
export const dynamic = 'force-dynamic';

const FALLBACK_METADATA = {
  title: 'Organic Discovery · ROI Mantra',
  description: 'One asset. Every surface. Measured against the outcome. Organic Discovery by ROI Mantra.',
};

export async function generateMetadata() {
  const data = await getPageBySlug('discovery');
  if (!data) notFound(); // unpublished or "Page Live" switched off
  return data.seo ? constructMetadata(data.seo) : FALLBACK_METADATA;
}

// Each section has a "Show on Page" switch in Strapi (isEnabled); a section
// switched off is not rendered. Missing = shown.
const isVisible = (section) => section.isEnabled !== false;

export default async function DiscoveryPage() {
  const data = await getPageBySlug('discovery');
  if (!data) notFound(); // unpublished or "Page Live" switched off
  const sections = Array.isArray(data?.sections) ? data.sections : [];

  return (
    <main className="discovery-page-wrapper">
      {sections.length ? (
        <SectionRenderer sections={sections.filter(isVisible)} components={DISCOVERY_SECTIONS} />
      ) : (
        <Discovery />
      )}
    </main>
  );
}
