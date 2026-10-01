import { Fragment, useEffect } from 'react';
import CmsLink from '../../common/CmsLink';
import { text, list, href } from '../../../lib/cms';

const DEFAULT_WORDS = ['CHANNELS', 'SEARCHES', 'FEEDS', 'ANSWERS', 'ADS'];
const DEFAULT_BUTTONS = [
    { label: 'The Work', href: '#work', arrowGlyph: '↗' },
    { label: 'The Thinking', href: '#thinking', arrowGlyph: '↗' },
];

// Heading words animate in one after another: 300ms, 380ms, 460ms, …
const wordDelay = (index) => `${300 + index * 80}ms`;

export default function HeroSection({ data = {} }) {
    const badgeText = text(data.badgeText, 'Discovery is broken into three. We rebuild it as one.');
    const line1 = text(data.headingLine1, 'Your customer').trim().split(/\s+/);
    const line2 = text(data.headingLine2, "doesn't think in").trim().split(/\s+/);
    const words = list(data.headingRotatorWords, DEFAULT_WORDS).filter((w) => typeof w === 'string' && w.trim());
    const rotatorWords = words.length ? words : DEFAULT_WORDS;
    const defaultWord = text(data.headingRotatorDefaultWord, rotatorWords[0]);
    const trailingPeriod = text(data.headingTrailingPeriod, '.');
    const subtitle = text(data.subtitle, 'So why does most marketing?');
    const infoStrip = text(data.infoStrip, '100+ brands / 100 Cr managed media / Dallas, TX / Delhi NCR');
    const scrollCue = text(data.scrollCueText, ' ↓ Scroll');
    const buttons = list(data.ctaButtons, DEFAULT_BUTTONS).filter(Boolean);
    const wordsKey = rotatorWords.join('|');

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const words = wordsKey.split('|');
        const rotatorWord = document.getElementById('rotatorWord');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!rotatorWord || prefersReducedMotion || words.length < 2) {
            return undefined;
        }

        let wordIndex = Math.max(0, words.indexOf(rotatorWord.textContent));
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
    }, [wordsKey]);

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
                                {line1.map((word, i) => (
                                    <Fragment key={`l1-${i}`}>
                                        {i > 0 && ' '}
                                        <span className="hero-title-winner" style={{ '--d': wordDelay(i) }}>{word}</span>
                                    </Fragment>
                                ))}
                            </div>
                            <div className="hero-title-line">
                                {line2.map((word, i) => (
                                    <Fragment key={`l2-${i}`}>
                                        {i > 0 && ' '}
                                        <span className="hero-title-winner" style={{ '--d': wordDelay(line1.length + i) }}>{word}</span>
                                    </Fragment>
                                ))}
                            </div>
                            <div className="hero-title-line flex">
                                <span className="hero-winner-rotator">
                                    <span id="rotatorWord" className="hero-rotator-word in">{defaultWord}</span>
                                </span>
                                <span className="hero-title-winner" style={{ '--d': wordDelay(line1.length + line2.length + 1) }}>{trailingPeriod}</span>
                            </div>
                        </h1>
                        <div className="hero-subtitle-innre reveal-up" style={{ animationDelay: '1100ms' }}>
                            <p className="hero-subtitle">{subtitle}</p>
                        </div>
                        <div className="hero-buttons reveal-up" style={{ animationDelay: '1300ms' }}>
                            {buttons.map((button, i) => (
                                <CmsLink
                                    key={`${button.label}-${i}`}
                                    href={href(button.href, DEFAULT_BUTTONS[i]?.href)}
                                    isExternal={button.isExternal}
                                    aria-label={button.ariaLabel || undefined}
                                    className="hero-buttons-pill common-btn"
                                >
                                    <span>{text(button.label, DEFAULT_BUTTONS[i]?.label)}</span>
                                    <span className="arr">{text(button.arrowGlyph, '↗')}</span>
                                </CmsLink>
                            ))}
                        </div>
                        <div className="hero-info reveal-up" style={{ animationDelay: '1500ms' }}>
                            {infoStrip}
                        </div>
                        <div className="hero-scroll reveal-up" style={{ animationDelay: '1500ms' }}>
                           <span>{scrollCue}</span>
                        </div>
                    </div>
                  </div>
                   
                </div>
            </section>
        </>
    );
}
