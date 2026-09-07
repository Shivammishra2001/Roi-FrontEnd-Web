'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../Contact.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_STATS = [
  { number: '25+', label: 'Years of Engineering Experience' },
  { number: '2,000+', label: 'Projects Deployed to Production' },
  { number: '200+', label: 'Global Clients Across 21 Countries' },
  { number: '8', label: 'Offices Across the Globe' },
];

export default function ContactStatsSection({ stats = DEFAULT_STATS }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {}, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact-stats-section">
      <div className="srcn-container">
        <div className="contact-stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-card-top">
                <span className="stat-number">{stat.number}</span>
                <div className="stat-icon-wrap">
                  <img src="/images/stats_clients.svg" alt="" />
                </div>
              </div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
