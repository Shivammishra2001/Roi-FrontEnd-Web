// Section components used by the /blog and /case-studies listing pages
// (see registry/home.ts). Both share the hero and CTA banner.
import BlogHeroSetion from '../../Blog/Section/BlogHeroSetion';
import BlogCardSection from '../../Blog/Section/BlogCardSection';
import BlogNumberSectio from '../../Blog/Section/BlogNumberSectio';
import CaseStudieCardSection from '../../CaseStudies/Section/CaseStudieCardSection';
import type { SectionRegistry } from '../SectionRenderer';

export const BLOG_SECTIONS: SectionRegistry = {
  'sections.listing-hero': BlogHeroSetion,
  'sections.blog-grid': BlogCardSection,
  'sections.cta-banner': BlogNumberSectio,
};

export const CASE_STUDY_SECTIONS: SectionRegistry = {
  'sections.listing-hero': BlogHeroSetion,
  'sections.case-study-grid': CaseStudieCardSection,
  'sections.cta-banner': BlogNumberSectio,
};
