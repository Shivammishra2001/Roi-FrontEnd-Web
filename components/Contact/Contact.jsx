'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';
import ContactHeroSection from './ContactSection/ContactHeroSection';
import ContactInfoSection from './ContactSection/ContactInfoSection';
import ContactFormSection from './ContactSection/ContactFormSection';
import ContactMapSection from './ContactSection/ContactMapSection';
import ContactStatsSection from './ContactSection/ContactStatsSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact({ data }) {
  const containerRef = useRef(null);
  const { heroBadge, heroHeading, heroSubheading, infoCard, stats, nextStepsHeading, nextSteps } = data || {};

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.contact-ambient-glow', {
        y: 200,
        scale: 1.35,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      // Continuous subtle breathing pulse on glow
      gsap.to('.contact-ambient-glow', {
        opacity: 0.9,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.from('.contact-breadcrumb', {
        y: -30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.heading-reveal-word', {
        y: '115%',
        opacity: 0,
        rotateZ: 4,
        duration: 1.1,
        stagger: 0.12,
        delay: 0.1,
        ease: 'power4.out',
      });

      // 4. Subtitle Fade In
      gsap.from('.contact-section-subheading', {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.45,
        ease: 'power3.out',
      });

      // 5. Left Column Info Card
      gsap.from('.contact-info-card', {
        y: 45,
        scale: 0.96,
        opacity: 0,
        duration: 0.9,
        delay: 0.55,
        ease: 'power3.out',
      });

      // 6. What Happens Next Card & Checkmarks Pop
      gsap.from('.what-next-block', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.what-next-item', {
        x: -25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.85,
        ease: 'power3.out',
      });

      gsap.from('.check-icon-wrap', {
        scale: 0,
        rotation: -45,
        duration: 0.6,
        stagger: 0.12,
        delay: 1.0,
        ease: 'back.out(2.5)',
      });

      // 7. Brands Marquee Slider Reveal
      gsap.from('.trusted-brands-block', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1.05,
        ease: 'power3.out',
      });

      // 8. Right Column Form Card High-Impact Reveal
      gsap.from('.contact-form-card', {
        y: 60,
        scale: 0.96,
        opacity: 0,
        duration: 1.1,
        delay: 0.25,
        ease: 'power4.out',
      });

      gsap.from('.floating-input-group', {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        delay: 0.55,
        ease: 'power2.out',
      });

      gsap.from(['.form-checkbox-row', '.recaptcha-wrapper', '.submit-btn-vibrant', '.security-notice-row'], {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        delay: 1.05,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <ContactHeroSection badge={heroBadge} title={heroHeading} subtitle={heroSubheading} />
      <section className="contact-main-section">
        <div className="srcn-container">
          <div className="contact-two-column-grid">
            <div className="contact-left-col">
              <ContactInfoSection
                heading={infoCard?.heading}
                email={infoCard?.email}
                phone={infoCard?.phone}
                nextStepsHeading={nextStepsHeading}
                nextSteps={nextSteps}
              />
            </div>

            <div className="contact-right-col">
              <ContactFormSection />
            </div>
          </div>
        </div>
      </section>
      <ContactStatsSection stats={stats} />
      <ContactMapSection />
    </>

  );
}
