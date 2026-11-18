'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

function FitText({ children, className, baseline = true, as: Component = 'h2' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = '100px';
      const pe = el.parentElement;
      if (!pe) return;
      const cs = getComputedStyle(pe);
      const w = pe.clientWidth - parseFloat(cs.paddingLeft || '0') - parseFloat(cs.paddingRight || '0');
      if (w <= 0 || !el.scrollWidth) return;
      const fs = (100 * w) / el.scrollWidth * 0.995;
      el.style.fontSize = `${fs}px`;

      if (baseline) {
        try {
          const cs2 = getComputedStyle(el);
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.font = `${cs2.fontWeight || '400'} ${fs}px ${cs2.fontFamily}`;
            const m = ctx.measureText(el.textContent.toUpperCase());
            const descent = (m && (m.fontBoundingBoxDescent || m.actualBoundingBoxDescent)) || 0;
            if (descent) {
              pe.style.transform = `translateY(${descent * 0.7}px)`;
            }
          }
        } catch {
        }
      }
    };

    fit();
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(fit);
    }
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [baseline, children]);

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}

export default function AboutHero({
  title = 'For brands, by veterans.',
  image = '/images/about/about-hero-eames.png',
}) {
  return (
    <section className="about-hero-section">
      <div className="about-banner-img">
        <Image
          src={image}
          alt="Hero · For brands, by veterans"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'scale-down', objectPosition: 'center' }}
        />
      </div>
      <div className="about-heading-area">
        <FitText className="about-heading" baseline>
          {title}
        </FitText>
      </div>
    </section>
  );
}