import type { ComponentType } from 'react';
import type { Section } from '../../types/strapi';
import Hero from '../Home/HomeSection/HeroSection';
import PartnerSection from '../Home/HomeSection/PartnerSection';
import TheShifSection from '../Home/HomeSection/TheShifSection';
import ThreePillarsSection from '../Home/HomeSection/ThreePillarsSection';
import CreativeFutureSection from '../Home/HomeSection/CreativeFutureSection';
import BrandsSection from '../Home/HomeSection/BrandsSection';
import OutlinedBandSection from '../Home/HomeSection/OutlinedBandSection';
import BlogSection from '../Home/HomeSection/BlogSection';
import TestimonialsSection from '../Home/HomeSection/TestimonialsSection';
import TalkDiscoverySection from '../Home/HomeSection/TalkDiscoverySection';

// The registry necessarily erases each component's specific prop type (they're
// heterogeneous, keyed by a runtime string) — this is the one deliberate `any`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SECTION_MAP: Record<string, ComponentType<any>> = {
  'sections.hero': Hero,
  'sections.logo-marquee': PartnerSection,
  'sections.timeline-shift': TheShifSection,
  'sections.three-pillars': ThreePillarsSection,
  'sections.stats-grid': CreativeFutureSection,
  'sections.brand-tile-marquee': BrandsSection,
  'sections.marquee-band': OutlinedBandSection,
  'sections.blog-preview': BlogSection,
  'sections.testimonials-carousel': TestimonialsSection,
  'sections.video-cta': TalkDiscoverySection,
};

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const Component = SECTION_MAP[section.__component];

        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            throw new Error(
              `SectionRenderer: no component mapped for __component "${section.__component}". ` +
                'Add it to SECTION_MAP in components/sections/SectionRenderer.tsx.'
            );
          }
          return null;
        }

        return <Component key={`${section.__component}-${index}`} {...section} />;
      })}
    </>
  );
}
