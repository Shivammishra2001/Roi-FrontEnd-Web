import './AboutSection/About.css';

export default function AboutHero({ eyebrow, title, subtitle }) {
  return (
    <section className="about-hero">
      <div className="srcn-container">
        <span className="about-eyebrow">{eyebrow}</span>
        <h1 className="about-title">{title}</h1>
        <p className="about-subtitle">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
