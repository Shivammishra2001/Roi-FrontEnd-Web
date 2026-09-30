import './AboutSection/About.css';

export default function AboutValues({ title, values = [] }) {
  return (
    <section className="about-values">
      <div className="srcn-container">
        <h2 className="about-section-title">{title}</h2>
        <div className="about-values-grid">
          {values.map((v, index) => (
            <div className="about-value-card" key={index}>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
