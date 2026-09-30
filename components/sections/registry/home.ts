// Section components used by the Home page. Kept per page so each route
// bundles only its own components (and the CSS they import) — exactly
// what the page loaded before it was CMS-driven.
import Hero from '../../Home/HomeSection/HeroSection';
import PartnerSection from '../../Home/HomeSection/PartnerSection';
import TheShifSection from '../../Home/HomeSection/TheShifSection';
import ThreePillarsSection from '../../Home/HomeSection/ThreePillarsSection';
import CreativeFutureSection from '../../Home/HomeSection/CreativeFutureSection';
import BrandsSection from '../../Home/HomeSection/BrandsSection';
import OutlinedBandSection from '../../Home/HomeSection/OutlinedBandSection';
import BlogSection from '../../Home/HomeSection/BlogSection';
import TestimonialsSection from '../../Home/HomeSection/TestimonialsSection';
import TalkDiscoverySection from '../../Home/HomeSection/TalkDiscoverySection';
import type { SectionRegistry } from '../SectionRenderer';

export const HOME_SECTIONS: SectionRegistry = {
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
