'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { text, list, imageUrl, slugify } from './aboutData';

const teamMembers = [
    {
        id: 1,
        name: 'Rahul Aggarwal',
        role: 'Founder',
        img: '/images/team/rahul-aggarwal-img.png'
    },
    {
        id: 2,
        name: 'Saksham Gupta',
        role: 'CEO',
        img: '/images/team/saksham-gupta-img.png'
    },
    {
        id: 3,
        name: 'Harjeet Singh Sodhi',
        role: 'Director, Operations',
        img: '/images/team/harjeet-singh-sodhi-img.png'
    },
    {
        id: 4,
        name: 'Syed Mohammad Ali',
        role: 'Director, Communications',
        img: '/images/team/syed-mohammad-ali-img.png'
    },
    {
        id: 5,
        name: 'Hemank Sharma',
        role: 'VP, Operations',
        img: '/images/team/hemank-sharma-img.png'
    },
    {
        id: 6,
        name: 'Arun Pratap Singh',
        role: 'VP, Paid Marketing',
        img: '/images/team/arun-pratap-singh-img.png'
    },
    {
        id: 7,
        name: 'Ramneek Singh Bhatia',
        role: 'Chief Business Officer',
        img: '/images/team/ramneek-singh-bhatia-img.png'
    },
    {
        id: 8,
        name: 'Siddhartha Singh',
        role: 'Senior Manager, Project Development',
        img: '/images/team/siddhartha-singh-img.png'
    },
    {
        id: 9,
        name: 'Manoj Kumar',
        role: 'Head, Finance',
        img: '/images/team/manoj-kumar-img.png'
    },
    {
        id: 10,
        name: 'Anita Kharka',
        role: 'Head, Human Resources',
        img: '/images/team/anita-kharka-img.png'
    },
];

export default function TeamSection(props) {
    const members = list(props.members, teamMembers).map((member, i) => ({
        id: member.id || `${member.name}-${i}`,
        name: member.name,
        role: member.role || '',
        img: imageUrl(member.photo || member.img, `/images/team/${slugify(member.name)}-img.png`),
    }));
    const badgeRef = useRef(null);
    const hideTimer = useRef(null);

    useEffect(() => {
        const badge = badgeRef.current || document.getElementById('hoverBadge');
        if (!badge) return;

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let animationFrameId;

        function animateBadge() {
            currentX += (mouseX - currentX) * 0.15;
            currentY += (mouseY - currentY) * 0.15;

            if (badge) {
                // Keep the badge fully on screen (matters on narrow phones).
                const half = badge.offsetWidth / 2 + 8;
                const x = Math.max(half, Math.min(window.innerWidth - half, currentX));
                badge.style.left = `${x}px`;
                badge.style.top = `${currentY}px`;
            }

            animationFrameId = requestAnimationFrame(animateBadge);
        }
        animationFrameId = requestAnimationFrame(animateBadge);

        const hide = () => {
            clearTimeout(hideTimer.current);
            badge.classList.remove('active');
        };

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        // Touch screens have no hover: a tap on a photo shows the same badge
        // (above the finger), and it goes away on a tap elsewhere, on scroll,
        // or after a few seconds.
        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            const card = touch && e.target instanceof Element ? e.target.closest('.team-card') : null;
            if (!card) return hide();
            mouseX = currentX = touch.clientX;
            mouseY = currentY = touch.clientY;
            badge.textContent = card.getAttribute('data-title') || '';
            badge.classList.add('touch', 'active');
            clearTimeout(hideTimer.current);
            hideTimer.current = setTimeout(hide, 3000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('scroll', hide, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('scroll', hide);
            clearTimeout(hideTimer.current);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleMouseEnter = (title) => {
        const badge = badgeRef.current || document.getElementById('hoverBadge');
        if (badge) {
            badge.textContent = title;
            badge.classList.remove('touch');
            badge.classList.add('active');
        }
    };

    const handleMouseLeave = () => {
        const badge = badgeRef.current || document.getElementById('hoverBadge');
        if (badge) {
            badge.classList.remove('active');
        }
    };

    return (
        <section className="team-section-area">
            <div className="srcn-container">
                <div className="team-wrap">
                    <div className="team-container-header-area">
                        <div className="stats-eyebrow"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>{text(props.eyebrow, 'The Team')}</div>
                        <h2 className="team-headline">
                            {text(props.headingBefore, 'Different disciplines. Different cities. ')}
                            <span className="team-highlight">{text(props.headingAccent, 'One obsession')}</span>
                            {text(props.headingAfter, ' — make the work mean something.')}
                        </h2>
                    </div>

                    <div className="team-grid">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="team-card"
                                data-title={`${member.name} — ${member.role}`}
                                onMouseEnter={() => handleMouseEnter(`${member.name} — ${member.role}`)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="team-card-pic">
                                    <Image
                                        src={member.img}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                        className="team-card-image"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        id="hoverBadge"
                        ref={badgeRef}
                        className="team-hover-badge"
                    />
                </div>
            </div>
        </section>
    );
}