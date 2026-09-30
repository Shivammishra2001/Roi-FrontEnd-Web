'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import '../Contact.css';
import TrustedBrandsSection from './TrustedBrandsSection';

export default function ContactInfoSection({
  heading = 'Get In Touch',
  email = 'sales@roimantra.com',
  phone = '+91 124 665 6000',
  nextStepsHeading = 'What Happens Next?',
  nextSteps = [
    { stepNumber: '01', description: 'Your enquiry will be reviewed by our team.' },
    { stepNumber: '02', description: "We'll get back to you as soon as possible." },
  ],
}) {
  const cardRef = useRef(null);

  const handleCardMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotateY: x * 0.035,
      rotateX: -y * 0.035,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 900,
    });
  };

  const handleCardMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  // Same reveal-word structure as before (heading-reveal-wrap > .heading-reveal-word
  // per word, targeted by GSAP in Contact.jsx) — just built from however many
  // words `heading` has instead of the 3 hardcoded ones ("GET" / "IN" / "TOUCH").
  const headingWords = heading ? heading.split(' ') : [];
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined;
  const emailHref = email ? `mailto:${email}` : undefined;

  return (
    <div className="contact_grid1">
      <div className="contact-header-block">
        <h2 className="contact-section-heading">
          {headingWords.map((word, index) => (
            <span className="heading-reveal-wrap" key={index}>
              <span className="heading-reveal-word">{word}</span>
            </span>
          ))}
        </h2>
        <p className="contact-section-subheading">
          Have a question, an idea, or an opportunity to discuss? Let us know how we can help, and we&apos;ll be in touch soon.
        </p>
      </div>

      <div
        ref={cardRef}
        className="contact-info-card"
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
      >
        <div className="contact-info-row">
          <div className="contact-icon-wrapper">
            <img src="/images/envelop.svg" alt="Email" />
          </div>
          <div className="contact-info-content">
            <span className="contact-info-label">Email</span>
            <a href={emailHref} className="contact-info-value">
              {email}
            </a>
          </div>
        </div>

        <div className="contact-card-divider" />

        <div className="contact-info-row">
          <div className="contact-icon-wrapper">
            <img src="/images/call-icon.svg" alt="Call" />
          </div>
          <div className="contact-info-content">
            <span className="contact-info-label">Call Us</span>
            <a href={phoneHref} className="contact-info-value">
              {phone}
            </a>
          </div>
        </div>
      </div>

      <div className="what-next-block">
        <h3 className="what-next-title">{nextStepsHeading}</h3>
        <div className="what-next-card">
          {(nextSteps || []).map((step, index) => (
            <div className="what-next-item" key={step.stepNumber ?? index}>
              <div className="check-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="check-svg">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="what-next-text">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <TrustedBrandsSection />
    </div>
  );
}
