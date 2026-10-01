import { useEffect } from 'react';

export default function HeroSection() {
    const gridCells = Array.from({ length: 60 }, (_, index) => index);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const words = ['CHANNELS', 'SEARCHES', 'FEEDS', 'ANSWERS', 'ADS'];
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
    }, []);

    return (
        <>
            <section id="hero-section-area" className="hero-section-area">
                
                <div className="srcn-container">
                  <div className="hero-container">
                    <div className="hero-section-area-rapper ">
                        <div className="hero-section-area-label reveal-up" style={{ animationDelay: '900ms' }}>
                            <span className="sub-tilte-heading">
                                <span className="hero-dot"></span>
                                Discovery is broken into three. We rebuild it as one.
                            </span>
                        </div>
                        <h1 className="hero-section-area-heeading">
                            <div className="hero-title-line">
                                <span className="hero-title-winner" style={{ '--d': '300ms' }}>Your</span>{' '}
                                <span className="hero-title-winner" style={{ '--d': '380ms' }}>customer</span>
                            </div>
                            <div className="hero-title-line">
                                <span className="hero-title-winner" style={{ '--d': '460ms' }}>doesn&apos;t</span>{' '}
                                <span className="hero-title-winner" style={{ '--d': '540ms' }}>think</span>{' '}
                                <span className="hero-title-winner" style={{ '--d': '620ms' }}>in</span>
                            </div>
                            <div className="hero-title-line flex">
                                <span className="hero-winner-rotator">
                                    <span id="rotatorWord" className="hero-rotator-word in">CHANNELS</span>
                                </span>
                                <span className="hero-title-winner" style={{ '--d': '780ms' }}>.</span>
                            </div>
                        </h1>
                        <div className="hero-subtitle-innre reveal-up" style={{ animationDelay: '1100ms' }}>
                            <p className="hero-subtitle">So why does most marketing?</p>
                        </div>
                        <div className="hero-buttons reveal-up" style={{ animationDelay: '1300ms' }}>
                            <a href="#work" className="hero-buttons-pill common-btn">
                                <span>The Work</span>
                                <span className="arr">↗</span>
                            </a>
                            <a href="#thinking" className="hero-buttons-pill common-btn">
                                <span>The Thinking</span>
                                <span className="arr">↗</span>
                            </a>
                        </div>
                        <div className="hero-info reveal-up" style={{ animationDelay: '1500ms' }}>
                            100+ brands / 100 Cr managed media / Dallas, TX / Delhi NCR
                        </div>
                        <div className="hero-scroll reveal-up" style={{ animationDelay: '1500ms' }}>
                           <span> ↓ Scroll</span>
                        </div>
                    </div>
                  </div>
                   
                </div>
            </section>
        </>
    );
}
