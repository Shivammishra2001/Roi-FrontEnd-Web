'use client';

import './ContactHeroSection.css';

// The design accents the trailing 3 words of the headline in yellow (was
// hardcoded as "BOOST YOUR BUSINESS" — literally the last 3 words of the
// original heading). The CMS stores heroHeading as one plain string, so
// that split is reconstructed here by word count rather than by matching a
// specific literal phrase, so it keeps working if an editor rewords it.
function renderTitle(heading) {
  if (!heading) return null;
  const words = heading.trim().split(' ');
  if (words.length <= 3) return heading;

  const lead = words.slice(0, -3).join(' ');
  const emphasis = words.slice(-3).join(' ');
  return (
    <>
      {lead} <span className="accent-yellow">{emphasis}</span>
    </>
  );
}

export default function ContactHeroSection({
  badge = 'GET IN TOUCH',
  title = 'CONNECT WITH US TO DISCOVER HOW WE CAN BOOST YOUR BUSINESS',
  subtitle = "Have a question, an idea, or an opportunity to discuss? Let's connect and explore how we can help your business thrive.",
}) {
  return (
    <section className="contact-hero-section">
      <div className="contact-hero-glow" aria-hidden="true" />
      <div className="srcn-container">
        <div className="contact-hero-content">
          <div className="contact-hero-badge">
            <span className="contact-hero-badge-dot" />
            <span>{badge}</span>
          </div>
          <h1 className="contact-hero-title">{renderTitle(title)}</h1>
          {subtitle && <p className="contact-hero-subtitle">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
