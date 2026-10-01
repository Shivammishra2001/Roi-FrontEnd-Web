'use client';
import './Contact.css';
import OfficeLocations from './ContactSection/OfficeLocations';
import ContactFromSection from './ContactSection/ContactFromSection'
import ContactLogoSlider from './ContactSection/ContactLogoSlider'
import ContactMapSection from './ContactSection/ContactMapSection';
import ContactStatsSection from './ContactSection/ContactStatsSection';

export default function Contact({ data }) {
  const { stats } = data || {};

  return (
    <div className="contact-page-wrapper-root">
      <OfficeLocations />
      <ContactFromSection/>
      <ContactLogoSlider/>
      {/* <ContactStatsSection stats={stats} /> */}
      <ContactMapSection />
    </div>
  );
}
