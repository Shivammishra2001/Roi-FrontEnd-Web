// Section components used by the Contact page (see registry/home.ts).
import OfficeLocations from '../../Contact/ContactSection/OfficeLocations';
import ContactFromSection from '../../Contact/ContactSection/ContactFromSection';
import PartnerSection from '../../Home/HomeSection/PartnerSection';
import ContactMapSection from '../../Contact/ContactSection/ContactMapSection';
import type { SectionRegistry } from '../SectionRenderer';
import type { Media } from '../../../types/strapi';

// The stats strip is hidden in the current design; its CMS content is kept,
// so mapping it back to ContactStatsSection restores it.
const Hidden = () => null;

// Client logos: the same continuous scrolling strip as the Home page.
const ClientLogos = ({ logos }: { logos?: Media[] }) => PartnerSection({ sectionAriaLabel: 'Our clients', partnerLogos: logos });

export const CONTACT_SECTIONS: SectionRegistry = {
  'sections.office-locations': OfficeLocations,
  'sections.contact-form': ContactFromSection,
  'sections.logo-slider': ClientLogos,
  'sections.contact-stats': Hidden,
  'sections.global-locations': ContactMapSection,
};
