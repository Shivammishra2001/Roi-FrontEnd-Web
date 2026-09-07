'use client';

import { Fragment, useEffect } from 'react';

export default function HeroSection({
    badgeText,
    headingLine1,
    headingLine2,
    headingRotatorDefaultWord,
    headingTrailingPeriod,
    subtitle,
    infoStrip,
    scrollCueText,
    ctaButtons,
    headingRotatorWords,
}) {
    const gridCells = Array.from({ length: 60 }, (_, index) => index);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const words = headingRotatorWords;
        const rotatorWord = document.getElementById('rotatorWord');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!rotatorWord || prefersReducedMotion) {
            return undefined;
        }

        let wordIndex = 0;
        let rotateTimeoutId = null;
        const rotateIntervalId = window.setInterval(() => {
            rotatorWord.className = 'hero-rotator-word out';

            rotateTimeoutId = window.setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                rotatorWord.textContent = words[wordIndex];
                rotatorWord.className = 'hero-rotator-word in-prep';

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        rotatorWord.className = 'hero-rotator-word in';
                    });
                });
            }, 700);
        }, 2500);

        return () => {
            window.clearInterval(rotateIntervalId);
            if (rotateTimeoutId !== null) {
                window.clearTimeout(rotateTimeoutId);
            }
        };
    }, [headingRotatorWords]);

    return (
        <>
            <section id="hero-section-area" className="hero-section-area">
                <div className="srcn-container">
                  <div className="hero-container">
                    <div className="hero-section-area-rapper ">
                        <div className="hero-section-area-label reveal-up" style={{ animationDelay: '900ms' }}>
                            <span className="sub-tilte-heading">
                                <span className="hero-dot"></span>
                                {badgeText}
                            </span>
                        </div>
                        <h1 className="hero-section-area-heeading">
                            <div className="hero-title-line">
                                {headingLine1.split(' ').map((word, i, arr) => (
                                    <Fragment key={i}>
                                        <span className="hero-title-winner" style={{ '--d': `${300 + i * 80}ms` }}>{word}</span>
                                        {i < arr.length - 1 ? ' ' : ''}
                                    </Fragment>
                                ))}
                            </div>
                            <div className="hero-title-line">
                                {headingLine2.split(' ').map((word, i, arr) => (
                                    <Fragment key={i}>
                                        <span className="hero-title-winner" style={{ '--d': `${460 + i * 80}ms` }}>{word}</span>
                                        {i < arr.length - 1 ? ' ' : ''}
                                    </Fragment>
                                ))}
                            </div>
                            <div className="hero-title-line flex">
                                <span className="hero-winner-rotator">
                                    <span id="rotatorWord" className="hero-rotator-word in">{headingRotatorDefaultWord}</span>
                                </span>
                                <span className="hero-title-winner" style={{ '--d': '780ms' }}>{headingTrailingPeriod}</span>
                            </div>
                        </h1>
                        <div className="hero-subtitle-innre reveal-up" style={{ animationDelay: '1100ms' }}>
                            <p className="hero-subtitle">{subtitle}</p>
                        </div>
                        <div className="hero-buttons reveal-up" style={{ animationDelay: '1300ms' }}>
                            {ctaButtons.map((btn, i) => (
                                <a key={i} href={btn.href} className="hero-buttons-pill common-btn">
                                    <span>{btn.label}</span>
                                    <span className="arr">{btn.arrowGlyph}</span>
                                </a>
                            ))}
                        </div>
                        <div className="hero-info reveal-up" style={{ animationDelay: '1500ms' }}>
                            {infoStrip}
                        </div>
                        <div className="hero-scroll reveal-up" style={{ animationDelay: '1500ms' }}>
                           <span>{scrollCueText}</span>
                        </div>
                    </div>
                  </div>

                </div>
            </section>
        </>
    );
}
