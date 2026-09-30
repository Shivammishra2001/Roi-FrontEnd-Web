// Section components used by the Contact page (see registry/home.ts).
import OfficeLocations from '../../Contact/ContactSection/OfficeLocations';
import ContactFromSection from '../../Contact/ContactSection/ContactFromSection';
import ContactLogoSlider from '../../Contact/ContactSection/ContactLogoSlider';
import ContactStatsSection from '../../Contact/ContactSection/ContactStatsSection';
import ContactMapSection from '../../Contact/ContactSection/ContactMapSection';
import type { SectionRegistry } from '../SectionRenderer';

export const CONTACT_SECTIONS: SectionRegistry = {
  'sections.office-locations': OfficeLocations,
  'sections.contact-form': ContactFromSection,
  'sections.logo-slider': ContactLogoSlider,
  'sections.contact-stats': ContactStatsSection,
  'sections.global-locations': ContactMapSection,
};
