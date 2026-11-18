import AboutHero from '../../About/AboutSection/AboutHero';
import RoiMantraAbout from '../../About/AboutSection/RoiMantraAbout';
import AboutEthosSection from '../../About/AboutSection/AboutEthosSection';
import AboutPillarsSection from '../../About/AboutSection/AboutPillarsSection';
import RoiStatsSection from '../../About/AboutSection/RoiStatsSection';
import AboutTabsSection from '../../About/AboutSection/AboutTabsSection';
import TeamSection from '../../About/AboutSection/TeamSection';
import AboutofficesData from '../../About/AboutSection/AboutofficesData';
import AboutCareersSection from '../../About/AboutSection/AboutCareersSection';
import AboutOurHistory from '../../About/AboutSection/AboutOurHistory';
import AboutDiscoverydctaSection from '../../About/AboutSection/AboutDiscoverydctaSection';
import type { SectionRegistry } from '../SectionRenderer';

export const ABOUT_SECTIONS: SectionRegistry = {
  'sections.about-hero': AboutHero,
  'sections.about-values': RoiMantraAbout,
  'sections.about-ethos': AboutEthosSection,
  'sections.ethos': AboutEthosSection,
  'sections.about-pillars': AboutPillarsSection,
  'sections.about-hold-true': AboutPillarsSection,
  'sections.pillars': AboutPillarsSection,
  'sections.about-StatsSection': RoiStatsSection,
  'sections.about-tabs': AboutTabsSection,
  'sections.about-zmw': AboutTabsSection,
  'sections.about-partnerships': AboutTabsSection,
  'sections.tabs': AboutTabsSection,
  'sections.about-teamSection': TeamSection,
  'sections.about-AboutofficesData': AboutofficesData,
  'sections.about-offices': AboutofficesData,
  'sections.about-careers': AboutCareersSection,
  'sections.careers': AboutCareersSection,
  'sections.about-AboutOurHistory': AboutOurHistory,
  'sections.about-history': AboutOurHistory,
  'sections.about-discovery': AboutDiscoverydctaSection,
  'sections.about-cta': AboutDiscoverydctaSection,
};

