'use client';

import { useEffect, useRef, useState } from 'react';

const aboutStatCards = [
    {
        value: 250,
        prefix: '',
        suffix: '+',
        title: 'People',
    },
    {
        value: 2000,
        prefix: '',
        suffix: '+',
        title: 'Brands',
    },
    {
        value: 600,
        prefix: '₹',
        suffix: ' Cr+',
        title: 'Revenue generated',
    },
    {
        value: 1500,
        prefix: '',
        suffix: '+',
        title: 'Websites shipped',
    },
];

function AnimatedCounter({ value, prefix = '', suffix = '' }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const counterRef = useRef(null);

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

export default function CreativeFutureSection({ eyebrow, heading }) {
    const displayEyebrow = !eyebrow || eyebrow.toLowerCase().includes('words') ? '⟶ IN NUMBERS' : eyebrow;
    const displayHeading = heading || 'Future-Ready Creativity';

    return (
        <section className="creative-future-section-area">
            <div className="srcn-container">
                <div className="common-wrapper-top-box">
                    <div className="common-row-aea">
                        <div className="common-top-header">
                            <div className="Believe-subtitle">
                                <span>{displayEyebrow}</span>
                            </div>
                            <h2 className="common-top-heading">
                                {displayHeading}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="creative-future-wrapper-top-box">
                    <div className="creative-future-grid">
                        {aboutStatCards.map((card, index) => (
                            <div className="creative-future-col" key={index}>
                                <div className="creative-future-card">
                                    <div className="creative-future-card-inner">
                                        <div className="creative-future-content">
                                            <div className="creative-future-number">
                                                <AnimatedCounter
                                                    value={card.value}
                                                    prefix={card.prefix}
                                                    suffix={card.suffix}
                                                />
                                            </div>
                                            <h3 className="creative-future-title">{card.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="creative-future-footer-note">
                        Six delivery centres. Two headquarters. One standard.
                    </p>
                </div>
            </div>
        </section>
    );
}
