'use client';

import './AboutSection/About.css';

const values = [
  {
    title: 'Strategy first',
    desc: 'Every campaign starts with a clear plan tied to real business outcomes, not vanity metrics.',
  },
  {
    title: 'Creative that converts',
    desc: 'We pair sharp design with data so the work looks great and actually performs.',
  },
  {
    title: 'Radical transparency',
    desc: 'You always know what we\u2019re doing, why we\u2019re doing it, and how it\u2019s performing.',
  },
];

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="srcn-container">
          <span className="about-eyebrow">⟶ About Us</span>
          <h1 className="about-title">We help brands grow with purpose.</h1>
          <p className="about-subtitle">
            ROI Mantra is a full-service growth partner blending strategy, creative,
            and technology to help businesses build measurable, lasting momentum.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="srcn-container">
          <h2 className="about-section-title">What we stand for</h2>
          <div className="about-values-grid">
            {values.map((v) => (
              <div className="about-value-card" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="srcn-container">
          <h2>Want to work together?</h2>
          <a href="/contact" className="btn btn--primary">
            <span>Start a conversation</span>
            <span className="arr">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
