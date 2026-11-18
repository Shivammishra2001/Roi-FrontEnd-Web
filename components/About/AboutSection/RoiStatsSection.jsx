'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
    {
        value: 250,
        suffix: '+',
        title: 'People',
        prefix: '',
    },
    {
        value: 2000,
        suffix: '+',
        title: 'Brands',
        prefix: '',
    },
    {
        value: 600,
        suffix: ' Cr+',
        title: 'Revenue generated',
        prefix: '₹',
    },
    {
        value: 1500,
        suffix: '+',
        title: 'Websites shipped',
        prefix: '',
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

export default function RoiStatsSection(props) {
    const eyebrow = typeof props?.eyebrow === 'string' && props.eyebrow.trim() && !props.eyebrow.includes('words')
        ? props.eyebrow
        : 'IN NUMBERS';
    const footer = typeof props?.footer === 'string' && props.footer.trim()
        ? props.footer
        : 'Six delivery centres. Two headquarters. One standard.';

    return (
        <section className="stats-section creative-future-section-area" style={{ background: 'var(--bg, #f4f1ec)' }}>
            <div className="srcn-container">
                <div className="stats-eyebrow">
                    <span className="arr">
                        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </span>
                    {eyebrow}
                </div>
                <div className="creative-future-wrapper-top-box" style={{ marginTop: 'clamp(24px, 3.5vw, 40px)' }}>
                    <div className="creative-future-grid">
                        {stats.map((stat, index) => (
                            <div className="creative-future-col" key={stat.title}>
                                <div className="creative-future-card" style={{ minHeight: '180px' }}>
                                    <div className="creative-future-card-inner">
                                        <div className="creative-future-content">
                                            <div className="creative-future-number">
                                                <AnimatedCounter
                                                    value={stat.value}
                                                    prefix={stat.prefix}
                                                    suffix={stat.suffix}
                                                />
                                            </div>
                                            <h3 className="creative-future-title">{stat.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="stats-footer-text" style={{ margin: 'clamp(28px, 3.5vw, 44px) 0 0', color: '#657487' }}>
                    {footer}
                </p>
            </div>
        </section>
    );
}
