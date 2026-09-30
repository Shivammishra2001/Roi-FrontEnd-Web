import './AboutSection/About.css';

export default function AboutCta({ title, buttonLabel, buttonHref, buttonArrowGlyph }) {
  return (
    <section className="about-cta">
      <div className="srcn-container">
        <h2>{title}</h2>
        <a href={buttonHref} className="btn btn--primary">
          <span>{buttonLabel}</span>
          <span className="arr">{buttonArrowGlyph}</span>
        </a>
      </div>
    </section>
  );
}
