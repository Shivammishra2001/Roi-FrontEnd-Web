'use client';

import { Fragment, useEffect } from 'react';

// Title words reveal one after another: 300ms, then +80ms per word
// (the rotator occupies one slot, the trailing period comes after it).
const wordDelay = (index) => `${300 + index * 80}ms`;

export default function HeroSection({
    badgeText,
    headingLine1 = '',
    headingLine2 = '',
    headingRotatorDefaultWord,
    headingTrailingPeriod,
    subtitle,
    infoStrip,
    scrollCueText,
    ctaButtons = [],
    headingRotatorWords = [],
}) {
    const line1Words = headingLine1.split(' ').filter(Boolean);
    const line2Words = headingLine2.split(' ').filter(Boolean);
    const rotatorWords = headingRotatorWords.length ? headingRotatorWords : [headingRotatorDefaultWord].filter(Boolean);
    const rotatorKey = rotatorWords.join('|');

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const words = rotatorKey ? rotatorKey.split('|') : [];
        const rotatorWord = document.getElementById('rotatorWord');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!rotatorWord || prefersReducedMotion || words.length < 2) {
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
    }, [rotatorKey]);

    const renderWords = (words, offset) =>
        words.map((word, index) => (
            <Fragment key={`${offset + index}-${word}`}>
                {index > 0 && ' '}
                <span className="hero-title-winner" style={{ '--d': wordDelay(offset + index) }}>{word}</span>
            </Fragment>
        ));

    const titleWordCount = line1Words.length + line2Words.length;

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
                                {renderWords(line1Words, 0)}
                            </div>
                            <div className="hero-title-line">
                                {renderWords(line2Words, line1Words.length)}
                            </div>
                            <div className="hero-title-line flex">
                                <span className="hero-winner-rotator">
                                    <span id="rotatorWord" className="hero-rotator-word in">{headingRotatorDefaultWord || rotatorWords[0]}</span>
                                </span>
                                {headingTrailingPeriod && (
                                    <span className="hero-title-winner" style={{ '--d': wordDelay(titleWordCount + 1) }}>{headingTrailingPeriod}</span>
                                )}
                            </div>
                        </h1>
                        <div className="hero-subtitle-innre reveal-up" style={{ animationDelay: '1100ms' }}>
                            <p className="hero-subtitle">{subtitle}</p>
                        </div>
                        <div className="hero-buttons reveal-up" style={{ animationDelay: '1300ms' }}>
                            {ctaButtons.map((button, index) => (
                                <a
                                    key={index}
                                    href={button.href}
                                    className="hero-buttons-pill common-btn"
                                    {...(button.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                >
                                    <span>{button.label}</span>
                                    <span className="arr">{button.arrowGlyph}</span>
                                </a>
                            ))}
                        </div>
                        <div className="hero-info reveal-up" style={{ animationDelay: '1500ms' }}>
                            {infoStrip}
                        </div>
                        {scrollCueText && (
                            <div className="hero-scroll reveal-up" style={{ animationDelay: '1500ms' }}>
                               <span> {scrollCueText}</span>
                            </div>
                        )}
                    </div>
                  </div>

                </div>
            </section>
        </>
    );
}
