'use client';

import { useEffect, useRef, useState } from 'react';

// About Us numbers, rendered with the Home page's creative-future card design
// (colored top accent bars + condensed Anton typography come from the global
// .creative-future-* rules in style.css; the per-column accent colours are set
// by .creative-future-col:nth-child(n) --line-color: teal / rose / coral / amber).
const stats = [
  { value: 250, prefix: '', suffix: '+', label: 'People' },
  { value: 2000, prefix: '', suffix: '+', label: 'Brands' },
  { value: 600, prefix: '₹', suffix: ' Cr+', label: 'Revenue generated' },
  { value: 1500, prefix: '', suffix: '+', label: 'Websites shipped' },
];

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

export default function RoiStatsSection() {
  return (
    <section className="stats-section creative-future-section-area">
      <div className="srcn-container">
        <div className="stats-eyebrow">
          <span className="arr">
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </span>
          IN NUMBERS
        </div>

        <div
          className="creative-future-wrapper-top-box"
          style={{ marginTop: 'clamp(24px, 3.5vw, 40px)' }}
        >
          <div className="creative-future-grid">
            {stats.map((stat) => (
              <div className="creative-future-col" key={stat.label}>
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
          Six delivery centres. Two headquarters. One standard.
        </p>
      </div>
    </section>
  );
}
