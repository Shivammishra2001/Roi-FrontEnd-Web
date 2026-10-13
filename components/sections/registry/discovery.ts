// Section components used by the Discovery page (see registry/home.ts).
import DiscoveryHeroSection from '../../Discovery/DiscoverySection/DiscoveryHeroSection';
import DiscoveryODShiftSection from '../../Discovery/DiscoverySection/DiscoveryODShiftSection';
import DiscoveryOdwedontSection from '../../Discovery/DiscoverySection/DiscoveryOdwedontSection';
import DiscoveryHowItWorksSection from '../../Discovery/DiscoverySection/DiscoveryHowItWorksSection';
import DiscoveryIntersectionObserver from '../../Discovery/DiscoverySection/DiscoveryIntersectionObserver';
import Discoverycasestudiesection from '../../Discovery/DiscoverySection/Discoverycasestudiesection';
import DiscoveryODAISection from '../../Discovery/DiscoverySection/DiscoveryODAISection';
import DiscoveryODConsistencySection from '../../Discovery/DiscoverySection/DiscoveryODConsistencySection';
import DiscoveryHowWeThinkOrganic from '../../Discovery/DiscoverySection/DiscoveryHowWeThinkOrganic';
import DiscoverydctaSection from '../../Discovery/DiscoverySection/DiscoverydctaSection';
import type { SectionRegistry } from '../SectionRenderer';

export const DISCOVERY_SECTIONS: SectionRegistry = {
  'sections.discovery-hero': DiscoveryHeroSection,
  'sections.discovery-shift': DiscoveryODShiftSection,
  'sections.discovery-statement': DiscoveryOdwedontSection,
  'sections.discovery-how-it-works': DiscoveryHowItWorksSection,
  'sections.discovery-surfaces': DiscoveryIntersectionObserver,
  'sections.discovery-work': Discoverycasestudiesection,
  'sections.discovery-ai': DiscoveryODAISection,
  'sections.discovery-consistency': DiscoveryODConsistencySection,
  'sections.discovery-principles': DiscoveryHowWeThinkOrganic,
  'sections.cta-banner': DiscoverydctaSection,
};
