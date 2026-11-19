'use client';

import { useEffect, useRef, useState } from 'react';

// About Us numbers, rendered with the Home page's creative-future card design
// (colored top accent bars + condensed Anton typography come from the global
// .creative-future-* rules in style.css; the per-column accent colours are set
// by .creative-future-col:nth-child(n) --line-color: teal / rose / coral / amber).
//
// Live values come from Strapi (sections.about-stats: { eyebrow, items[], footer },
// each item { value, prefix, suffix, label }). These are only the fallback used
// when the CMS data is genuinely absent.
const FALLBACK_STATS = [
  { value: 250, prefix: '', suffix: '+', label: 'People' },
  { value: 2000, prefix: '', suffix: '+', label: 'Brands' },
  { value: 600, prefix: '₹', suffix: ' Cr+', label: 'Revenue generated' },
  { value: 1500, prefix: '', suffix: '+', label: 'Websites shipped' },
];

const DEFAULT_EYEBROW = 'IN NUMBERS';
const DEFAULT_FOOTER = 'Six delivery centres. Two headquarters. One standard.';

function AnimatedCounter({ value, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const counterRef = useRef(null);

  // Start counting once the number scrolls into view (once).
  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Ease-out-quart count-up over 1.8s.
  useEffect(() => {
    if (!started) return;
    let frameId;
    let startTime;
    const duration = 1800;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [started, value]);

  return (
    <span ref={counterRef}>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

// Strapi passes the whole `sections.about-stats` entry as props (SectionRenderer
// spreads it). Map it to the cards; fall back to the built-ins only when a field
// is genuinely missing so the section never renders empty.
export default function RoiStatsSection(props) {
  const rawItems =
    Array.isArray(props?.items) && props.items.length ? props.items : FALLBACK_STATS;
  const items = rawItems.map((it) => ({
    value: Number(it?.value) || 0,
    prefix: typeof it?.prefix === 'string' ? it.prefix : '',
    suffix: typeof it?.suffix === 'string' ? it.suffix : '',
    label: typeof it?.label === 'string' ? it.label : '',
  }));

  const eyebrow =
    typeof props?.eyebrow === 'string' && props.eyebrow.trim() ? props.eyebrow : DEFAULT_EYEBROW;
  const footer =
    typeof props?.footer === 'string' && props.footer.trim() ? props.footer : DEFAULT_FOOTER;

  return (
    <section className="stats-section creative-future-section-area">
      <div className="srcn-container">
        <div className="stats-eyebrow">
          <span className="arr">
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </span>
          {eyebrow}
        </div>

        <div
          className="creative-future-wrapper-top-box"
          style={{ marginTop: 'clamp(24px, 3.5vw, 40px)' }}
        >
          <div className="creative-future-grid">
            {items.map((stat, index) => (
              <div className="creative-future-col" key={index}>
                <div className="creative-future-card">
                  <div className="creative-future-card-inner">
                    <div className="creative-future-content">
                      <div className="creative-future-number">
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                        />
                      </div>
                      <h3 className="creative-future-title">{stat.label}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p
          className="stats-footer-text"
          style={{ margin: 'clamp(28px, 3.5vw, 44px) 0 0', color: '#657487' }}
        >
          {footer}
        </p>
      </div>
    </section>
  );
}
