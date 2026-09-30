'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../Contact.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}



function parseNumberParts(rawStr) {
  const str = String(rawStr || '').trim();
  const match = str.match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!match) {
    return { prefix: '', target: 0, suffix: str, hasComma: false, decimals: 0, original: str };
  }

  const prefix = match[1] || '';
  const numPart = match[2];
  const suffix = match[3] || '';
  const hasComma = numPart.includes(',');
  const parsedVal = parseFloat(numPart.replace(/,/g, '')) || 0;
  const decimalPart = numPart.split('.')[1];
  const decimals = decimalPart ? decimalPart.length : 0;

  return {
    prefix,
    target: parsedVal,
    suffix,
    hasComma,
    decimals,
    original: str,
  };
}

function formatValue(val, hasComma, decimals) {
  let formatted = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  if (hasComma) {
    const parts = formatted.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    formatted = parts.join('.');
  }
  return formatted;
}

export default function ContactStatsSection({ stats = [] }) {
  const sectionRef = useRef(null);
  const activeStats = stats || [];

  useEffect(() => {
    if (!sectionRef.current) return;

    const grid = sectionRef.current.querySelector('.contact-stats-grid');
    const numberEls = sectionRef.current.querySelectorAll('.stat-number');
    if (!numberEls.length) return;

    const ctx = gsap.context(() => {
      // 1. Animate entire grid as a single aligned unit so cards always stay in 1 straight line
      if (grid) {
        gsap.fromTo(
          grid,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          numberEls.forEach((el, index) => {
            const rawTarget = el.getAttribute('data-target') || el.innerText;
            const { prefix, target, suffix, hasComma, decimals, original } = parseNumberParts(rawTarget);

            if (target === 0) return;

            const counterObj = { current: 0 };
            el.innerText = `${prefix}${formatValue(0, hasComma, decimals)}${suffix}`;

            gsap.to(counterObj, {
              current: target,
              duration: 2,
              ease: 'power2.out',
              delay: index * 0.08,
              onUpdate: () => {
                el.innerText = `${prefix}${formatValue(counterObj.current, hasComma, decimals)}${suffix}`;
              },
              onComplete: () => {
                el.innerText = original;
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeStats]);

  return (
    <section ref={sectionRef} className="contact-stats-section">
      <div className="srcn-container">
        <div className="contact-stats-grid">
          {activeStats.map((stat, index) => {
            const iconSrc = stat.icon?.url;
            return (
              <div className="stat-card" key={index}>
                <div className="stat-card-top">
                  <span className="stat-number" data-target={stat.number}>
                    {stat.number}
                  </span>
                  <div className="stat-icon-wrap">
                    {iconSrc && (
                      <img
                        src={iconSrc}
                        alt=""
                        aria-hidden="true"
                        className="stat-icon"
                        width={40}
                        height={40}
                      />
                    )}
                  </div>
                </div>
                <p className="stat-label">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
