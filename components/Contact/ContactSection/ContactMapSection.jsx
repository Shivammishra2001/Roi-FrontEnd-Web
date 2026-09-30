'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rawLandDeg } from './globeLandData';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const gridPoints = rawLandDeg.map(([lon, lat]) => [
    (lon * Math.PI) / 180,
    (lat * Math.PI) / 180,
]);

const CITIES = [
    {
        id: 'india',
        name: 'India',
        lon: 77.02,
        lat: 28.46,
        countryCode: 'in',
        label: 'Asia - Gurgaon, Jaipur, Mumbai',
        flag: '/images/flags/in.png',
        isPrimary: true,
    },
    {
        id: 'canada',
        name: 'Canada',
        lon: -106.3468,
        lat: 56.1304,
        label: 'North America - Canada',
        flag: '/images/flags/ca.svg',
    },

    {
        id: 'dallas',
        name: 'Dallas',
        lon: -96.7970,
        lat: 32.7767,
        label: 'North America - Dallas, USA',
        flag: '/images/flags/us.png',
    },
    {
        id: 'dubai',
        name: 'Dubai',
        lon: 55.2708,
        lat: 25.2048,
        label: 'Middle East - Dubai',
        flag: '/images/flags/ae.png',
    },
].map((city) => ({
    ...city,
    lonRad: (city.lon * Math.PI) / 180,
    latRad: (city.lat * Math.PI) / 180,
}));

const LOCATION_HUBS = CITIES.map((city) => ({
    ...city,
    lonRad: city.lonRad,
    latRad: city.latRad,
})).concat({
    id: 'noida-hub',
    name: 'Noida',
    lon: 77.391,
    lat: 28.5355,
    lonRad: (77.391 * Math.PI) / 180,
    latRad: (28.5355 * Math.PI) / 180,
});

export default function ContactMapSection() {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);
    const canvasRef = useRef(null);
    const tooltipsRef = useRef({});
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const ctx = canvas.getContext('2d');
        // Initial rotation angle (~1.75 rad) puts North America (Canada & Dallas, USA) facing front
        let rotation = 1.75;
        const rotationSpeed = 0.0025;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const wrapper = cardRef.current || (canvas ? canvas.parentElement : null);
            const wrapperWidth = wrapper && wrapper.clientWidth ? wrapper.clientWidth : 650;
            const isDesktop = window.innerWidth >= 992;
            const maxAllowed = isDesktop
                ? Math.min(wrapperWidth, 710)
                : Math.min(window.innerWidth * 0.92, 500);
            const size = Math.max(280, Math.round(Math.min(maxAllowed, window.innerHeight * 0.8)));

            canvas.width = size * dpr;
            canvas.height = size * dpr;
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;
        };

        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const dpr = window.devicePixelRatio || 1;
            const width = canvas.width;
            const height = canvas.height;
            const radius = 0.38 * Math.min(width, height);
            const centerX = width / 2;
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);

            // 1. Atmosphere outer glow (haze around sphere)
            const outerHaze = ctx.createRadialGradient(
                centerX, centerY, radius * 0.94,
                centerX, centerY, radius * 1.15
            );
            outerHaze.addColorStop(0, 'rgba(0, 160, 255, 0.22)');
            outerHaze.addColorStop(0.5, 'rgba(0, 120, 240, 0.08)');
            outerHaze.addColorStop(1, 'rgba(0, 80, 200, 0)');
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 1.15, 0, 2 * Math.PI);
            ctx.fillStyle = outerHaze;
            ctx.fill();

            // 2. Dark globe sphere base with inner rim glow
            const innerGlobe = ctx.createRadialGradient(
                centerX, centerY, radius * 0.2,
                centerX, centerY, radius
            );
            innerGlobe.addColorStop(0, 'rgba(2, 6, 14, 0.98)');
            innerGlobe.addColorStop(0.7, 'rgba(3, 14, 30, 0.95)');
            innerGlobe.addColorStop(0.92, 'rgba(0, 60, 130, 0.35)');
            innerGlobe.addColorStop(1, 'rgba(0, 170, 255, 0.25)');
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = innerGlobe;
            ctx.fill();

            // 3. Globe boundary circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(0, 180, 255, 0.45)';
            ctx.lineWidth = 1.3 * dpr;
            ctx.stroke();

            // 4. Orbital Ring 1 (Outer ring with glowing satellites)
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(-0.22); // ~12.5 deg tilt
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 1.16, radius * 1.14, 0, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(0, 160, 255, 0.35)';
            ctx.lineWidth = 1.2 * dpr;
            ctx.stroke();

            // Satellites along outer orbit
            const satelliteCount = 6;
            for (let i = 0; i < satelliteCount; i++) {
                const angle = rotation * 0.8 + (i * Math.PI * 2) / satelliteCount;
                const satX = Math.cos(angle) * radius * 1.16;
                const satY = Math.sin(angle) * radius * 1.14;

                // Soft outer aura
                ctx.beginPath();
                ctx.arc(satX, satY, 5.5 * dpr, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(0, 210, 255, 0.28)';
                ctx.fill();

                // Bright node core
                ctx.beginPath();
                ctx.arc(satX, satY, 2.6 * dpr, 0, 2 * Math.PI);
                ctx.fillStyle = '#c8f5ff';
                ctx.shadowColor = '#00e5ff';
                ctx.shadowBlur = 10 * dpr;
                ctx.fill();
            }
            ctx.restore();

            // 5. Orbital Ring 2 (Inner tilted ring for gyroscopic satellite orbit look)
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(-0.45); // ~26 deg tilt
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 1.09, radius * 1.05, 0, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(0, 190, 255, 0.28)';
            ctx.lineWidth = 1.0 * dpr;
            ctx.stroke();
            ctx.restore();

            // 6. Project and draw continent land dots
            const projected = [];
            gridPoints.forEach(([lon, lat]) => {
                const angle = lon + rotation;
                const x = radius * Math.cos(lat) * Math.sin(angle);
                const z = radius * Math.cos(lat) * Math.cos(angle);
                const y = radius * Math.sin(lat);
                if (z > -0.05 * radius) {
                    projected.push([x, y, z]);
                }
            });
            projected.sort((a, b) => a[2] - b[2]);

            projected.forEach(([x, y, z]) => {
                const depth = (z + radius) / (2 * radius);
                const dotRadius = (0.75 + 1.45 * depth) * dpr;
                ctx.beginPath();
                ctx.arc(centerX + x, centerY - y, dotRadius, 0, 2 * Math.PI);

                if (z > 0.15 * radius) {
                    const bright = 0.65 + 0.35 * (z / radius);
                    ctx.fillStyle = `rgba(0, 220, 255, ${bright.toFixed(2)})`;
                } else if (z > 0) {
                    ctx.fillStyle = `rgba(0, 185, 255, ${(0.35 + 0.3 * (z / (0.15 * radius))).toFixed(2)})`;
                } else {
                    ctx.fillStyle = `rgba(0, 130, 220, ${(0.12 + 0.23 * ((z + 0.05 * radius) / (0.05 * radius))).toFixed(2)})`;
                }
                ctx.fill();
            });

            // 7. Location Hub markers with cyan pulsing glow
            LOCATION_HUBS.forEach((hub) => {
                const angle = hub.lonRad + rotation;
                const x = radius * Math.cos(hub.latRad) * Math.sin(angle);
                const z = radius * Math.cos(hub.latRad) * Math.cos(angle);
                const y = radius * Math.sin(hub.latRad);
                if (z <= 0.02 * radius) return;

                const pulse = (Math.sin(Date.now() * 0.005) + 1) / 2;
                const depth = (z + radius) / (2 * radius);
                const markerOpacity = 0.4 + depth * 0.6;

                ctx.save();
                ctx.beginPath();
                ctx.arc(centerX + x, centerY - y, (5 + pulse * 9) * dpr, 0, 2 * Math.PI);
                ctx.strokeStyle = `rgba(0, 230, 255, ${(markerOpacity * (0.4 + (1 - pulse) * 0.5)).toFixed(2)})`;
                ctx.lineWidth = 1.4 * dpr;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(centerX + x, centerY - y, 3.8 * dpr, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(0, 255, 255, ${markerOpacity.toFixed(2)})`;
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 12 * dpr;
                ctx.fill();
                ctx.restore();
            });

            // 8. Update Tooltips position & opacity
            CITIES.forEach((city) => {
                const angle = city.lonRad + rotation;
                const x = radius * Math.cos(city.latRad) * Math.sin(angle);
                const z = radius * Math.cos(city.latRad) * Math.cos(angle);
                const y = radius * Math.sin(city.latRad);
                const element = tooltipsRef.current[city.id];
                if (!element) return;

                if (z > 0.06 * radius) {
                    element.style.display = 'flex';
                    element.style.left = `${(centerX + x) / dpr}px`;
                    element.style.top = `${(centerY - y) / dpr}px`;
                    element.style.opacity = Math.min(1, ((z - 0.06 * radius) / (0.2 * radius))).toFixed(2);
                } else {
                    element.style.display = 'none';
                }
            });

            rotation += rotationSpeed;
            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        const animationContext = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    once: true,
                },
                defaults: { ease: 'power3.out' },
            });

            timeline
                .from('.globe-header', { y: 35, opacity: 0, duration: 0.8 })
                .from('.globe-column', { scale: 0.9, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.4')
                .from(['.globe-office-name', '.globe-office-detail-row'], { y: 15, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.4');
        }, sectionRef);

        return () => {
            animationContext.revert();
            window.removeEventListener('resize', resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const handleCardMove = (event) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(card, { rotateY: x * 0.035, rotateX: -y * 0.035, duration: 0.3, ease: 'power2.out' });
    };

    const handleCardLeave = () => {
        if (cardRef.current) gsap.to(cardRef.current, { rotateX: 0, rotateY: 0 });
    };

    return (
        <section ref={sectionRef} className="globe-section">
            <div className="globe-ambient-glow" aria-hidden="true" />
            <div className="srcn-container">
                <div className="globe-header">
                    <h2 className="globe-title">Our Global <span className="accent-yellow">Locations</span></h2>
                </div>

                <div className="globe-main-layout">
                    <div className="globe-column">
                        <div ref={cardRef} className="globe-wrapper">
                            <canvas ref={canvasRef} className="globe-canvas" />
                            {CITIES.map((city) => (
                                <div
                                    key={city.id}
                                    ref={(element) => {
                                        if (element) tooltipsRef.current[city.id] = element;
                                    }}
                                    className="globe-tooltip owl-item animated owl-animated-in"
                                >
                                    <span className="flag-badge">
                                        {city.flag.startsWith('/') ? (
                                            <img src={city.flag} alt={city.name} />
                                        ) : (
                                            <span className="flag-emoji" aria-hidden="true">{city.flag}</span>
                                        )}
                                    </span>
                                    <span className="globe-tooltip-text">{city.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="globe-location-sidebar">
                        <div className="office-locations-section">
                            <div className="office-region">
                                <h3 className="office-region-title"><span><span className="arr"><i className="fa fa-long-arrow-right"></i></span> Asia</span></h3>
                                <div className="office-region-card">
                                    <div className="office-item">
                                        <h4 className="office-city selected">

                                            Noida
                                        </h4>
                                        <div className="office-detail">
                                            <span className="mail-icon">
                                                <img
                                                    src="/images/location-icon.png"
                                                    alt=""
                                                />
                                            </span>
                                            <span>
                                                JMD Megapolis Sohna Road Sector 48 Noida 122001,
                                                Haryana, India
                                            </span>
                                        </div>
                                        <div className="office-detail">
                                            <span className="mail-icon">
                                                <img
                                                    src="/images/sms-icon.png"
                                                    alt=""
                                                />
                                            </span>
                                            <a href="info@adglobal360.com">
                                              info@adglobal360.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="office-item">
                                        <h4 className="office-city">Mumbai</h4>
                                        <div className="office-detail">
                                            <span className="office-icon">
                                                <img src="/images/location.svg" alt="" />
                                            </span>
                                            <span>
                                                Lodha Supremus Rd Number 22, Wagle Estate
                                                Thane, Mumbai 400604, Maharashtra, India
                                            </span>
                                        </div>
                                    </div>
                                    <div className="office-item">
                                        <h4 className="office-city">Bengaluru</h4>
                                        <div className="office-detail">
                                            <span className="mail-icon">
                                                <img
                                                    src="/images/location-icon.png"
                                                    alt=""
                                                />
                                            </span>
                                            <span>
                                                The Pavilion – 62/63, Church Street,
                                                Haridevpur, Shanthala Nagar, Ashok Nagar,
                                                Bengaluru 560001, Karnataka, India
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="office-region">
                                <h3 className="office-region-title">
                                    <span><span className="arr"><i className="fa fa-long-arrow-right"></i></span> North America</span>
                                </h3>
                                <div className="office-region-card">
                                    <div className="office-item">
                                        <h4 className="office-city">Boston</h4>

                                        <div className="office-detail">
                                            <span className="mail-icon">
                                                <img
                                                    src="/images/location-icon.png"
                                                    alt=""
                                                />
                                            </span>

                                            <span>
                                                1600 Boston-Providence Highway
                                                Walpole, MA 02081
                                            </span>
                                        </div>
                                    </div>

                                    <div className="office-item">
                                        <h4 className="office-city">Canada</h4>

                                        <div className="office-detail">
                                            <span className="mail-icon">
                                                <img
                                                    src="/images/location-icon.png"
                                                    alt=""
                                                />
                                            </span>
                                            <span>
                                                Canada
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="office-region">
                                <h3 className="office-region-title">
                                    <span><span className="arr"><i className="fa fa-long-arrow-right"></i></span>Middle East</span>
                                </h3>
                                <div className="office-region-card">
                                    <div className="office-item">
                                        <h4 className="office-city">Dubai</h4>
                                        <div className="office-detail">
                                            <span className="mail-icon">
                                                <img
                                                    src="/images/location-icon.png"
                                                    alt=""
                                                />
                                            </span>
                                            <span>
                                                Level 23, Boulevard Plaza Tower 2 Sheikh Mohammed bin Rashid Boulevard, Dubai, UAE
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
