'use client';
import "./HomeCss.css"
import HeroSection from "./HomeSection/HeroSection";
import PartnerSection from "./HomeSection/PartnerSection";
import TheShifSection from "./HomeSection/TheShifSection";
import ThreePillarsSection from "./HomeSection/ThreePillarsSection";
import CreativeFutureSection from "./HomeSection/CreativeFutureSection";
import BrandsSection from "./HomeSection/BrandsSection";
import OutlinedBandSection from "./HomeSection/OutlinedBandSection";
import BlogSection from "./HomeSection/BlogSection";
import TestimonialsSection from "./HomeSection/TestimonialsSection";
import TalkDiscoverySection from "./HomeSection/TalkDiscoverySection";

// Strapi `__component` → section. Order on the page follows the CMS.
const SECTIONS = {
  'sections.hero': HeroSection,
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

// CMS unreachable or empty: every section renders its built-in copy.
const DEFAULT_ORDER = Object.keys(SECTIONS).map((key) => ({ __component: key }));

export default function HomePage({ sections }) {
  const list = Array.isArray(sections) && sections.length > 0 ? sections : DEFAULT_ORDER;

  return (
    <>
      {list.map((section, index) => {
        const Section = SECTIONS[section?.__component];
        if (!Section) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`[home] No component for "${section?.__component}" — skipped`);
          }
          return null;
        }
        return <Section key={`${section.__component}-${index}`} data={section} />;
      })}
    </>
  );
}
