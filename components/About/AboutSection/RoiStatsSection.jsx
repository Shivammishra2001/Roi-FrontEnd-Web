
'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
    {
        value: 250,
        suffix: '+',
        label: 'People',
        prefix: '',
    },
    {
        value: 2000,
        suffix: '+',
        label: 'Brands',
        prefix: '',
    },
    {
        value: 600,
        suffix: ' Cr+',
        label: 'Revenue generated',
        prefix: '₹',
    },
    {
        value: 1500,
        suffix: '+',
        label: 'Websites shipped',
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
            const progress = Math.min(
                (timestamp - startTime) / duration,
                1
            );

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
        <h2 className="stats-number" ref={counterRef}>
            {prefix}
            {count.toLocaleString('en-IN')}
            {suffix}
        </h2>
    );
}

export default function RoiStatsSection() {
    return (
        <section className="stats-section">
            <div className="srcn-container">
                <div className="stats-eyebrow"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>IN NUMBERS</div>
                <div className="stats-grid">
                    {stats.map((stat) => (
                        <div className="stats-item" key={stat.label}>
                            <AnimatedCounter
                                value={stat.value}
                                prefix={stat.prefix}
                                suffix={stat.suffix}
                            />
                            <p className="stats-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
                <p className="stats-footer">
                    Six delivery centres. Two headquarters. One standard.
                </p>
            </div>
        </section>
    );
}
