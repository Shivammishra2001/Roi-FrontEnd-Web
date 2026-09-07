'use client';

import React, { useRef, useEffect, useState } from 'react';

// Per-tile gradient-overlay color. Design-only (not content — excluded from
// the CMS inventory on that basis), zipped positionally onto `brandTiles`
// which is seeded in this exact same order.
const TILE_TONES = [
    '#0b6e9a', '#3a1d6b', '#1a1a1a', '#0a4f8a', '#b35900', '#2f5d3f',
    '#7a5a2a', '#5a3e2a', '#8a2a4a', '#a3324f', '#0f5f5f', '#1a4d6b',
    '#5a4a2a', '#7a4a2a',
];

export default function BrandsSection({ headingPrefix, headingEmphasis, brandTiles }) {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [trackOffset, setTrackOffset] = useState(0);
    const [tilt, setTilt] = useState(1);

    useEffect(() => {
        const sec = sectionRef.current;
        const tr = trackRef.current;
        if (!sec || !tr) return;
        const compute = () => {
            const r = sec.getBoundingClientRect();
            const total = r.height - window.innerHeight;
            const p = Math.max(0, Math.min(1, -r.top / total));
            const trackWidth = tr.scrollWidth;
            const viewW = window.innerWidth;
            const maxX = Math.max(0, trackWidth - viewW + 80);
            setTrackOffset(p * maxX);
            setTilt(Math.max(0, 1 - p * 1.6));
        };
        window.addEventListener('scroll', compute, { passive: true });
        window.addEventListener('resize', compute);
        compute();
        return () => {
            window.removeEventListener('scroll', compute);
            window.removeEventListener('resize', compute);
        };
    }, []);

    return (
        <section id="work" ref={sectionRef} className="pin-section bg-paper" style={{ height: '380vh' }}>
            <div className="pin-stage">
                <div className="srcn-container">
                    <div className="work-header">
                        <h2 className="common-top-heading page-title">
                            {headingPrefix}<span>{headingEmphasis}</span>
                        </h2>
                    </div>

                    <div className="tilt-stage user-items-list">
                        <div className="tilt-row"
                            style={{
                                transform: `rotateX(${12 * tilt}deg) rotateY(${-6 * tilt}deg)`,
                                transition: 'transform 400ms cubic-bezier(.2,.7,.2,1)',
                            }}>
                            <div ref={trackRef} className="work-track"
                                style={{
                                    transform: `translateX(${-trackOffset}px)`,
                                    willChange: 'transform',
                                }}>
                                {brandTiles.map((t, i) => {
                                    const tone = TILE_TONES[i % TILE_TONES.length];
                                    return (
                                        <div key={t.name}
                                            className="work-tile"
                                            style={{
                                                backgroundImage: `linear-gradient(135deg, ${tone}cc, ${tone}66), url(${t.photo.url})`,
                                                transform: `rotateZ(${(i % 2 === 0 ? 1 : -1) * 3 * tilt}deg)`,
                                            }}>
                                            <div className="work-tile-cat">{t.category}</div>
                                            <div className="work-tile-label">{t.name.toUpperCase()}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
