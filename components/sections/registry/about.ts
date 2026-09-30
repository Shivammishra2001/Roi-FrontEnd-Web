// Section components used by the About page (see registry/home.ts).
import AboutHero from '../../About/AboutHero';
import AboutValues from '../../About/AboutValues';
import AboutCta from '../../About/AboutCta';
import type { SectionRegistry } from '../SectionRenderer';

export const ABOUT_SECTIONS: SectionRegistry = {
  'sections.about-hero': AboutHero,
  'sections.about-values': AboutValues,
  'sections.about-cta': AboutCta,
};
