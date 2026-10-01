// Section components used by the Contact page (see registry/home.ts).
import OfficeLocations from '../../Contact/ContactSection/OfficeLocations';
import ContactFromSection from '../../Contact/ContactSection/ContactFromSection';
import ContactLogoSlider from '../../Contact/ContactSection/ContactLogoSlider';
import ContactMapSection from '../../Contact/ContactSection/ContactMapSection';
import type { SectionRegistry } from '../SectionRenderer';

// The stats strip is hidden in the current design; its CMS content is kept,
// so mapping it back to ContactStatsSection restores it.
const Hidden = () => null;

export const CONTACT_SECTIONS: SectionRegistry = {
  'sections.office-locations': OfficeLocations,
  'sections.contact-form': ContactFromSection,
  'sections.logo-slider': ContactLogoSlider,
  'sections.contact-stats': Hidden,
  'sections.global-locations': ContactMapSection,
};
