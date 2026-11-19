'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { text, imageUrl } from './aboutData';

const PILL_EDGE = 8; // px the pill keeps from each card edge

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
    // Strapi members (name/role/photo) when present, else the built-in list.
    // Each photo falls back to the local image at the same position.
    const strapiMembers = Array.isArray(props?.members) ? props.members : [];
    const members = (strapiMembers.length ? strapiMembers : teamMembers).map((m, i) => {
        const fb = teamMembers[i] || {};
        return {
            id: m.id ?? i + 1,
            name: text(m.name, fb.name),
            role: text(m.role, fb.role),
            img: imageUrl(m.photo ?? m.img, fb.img),
        };
    });

    // Move a card's pill to the pointer, clamped so it stays fully inside that
    // card (never escapes its top/bottom/edges). DOM-direct so it doesn't
    // re-render React.
    const positionPill = (e) => {
        const card = e.currentTarget;
        const pill = card.querySelector('.team-card-badge');
        if (!pill) return;
        const rect = card.getBoundingClientRect();
        const pw = pill.offsetWidth;
        const ph = pill.offsetHeight;
        let x = e.clientX - rect.left - pw / 2;
        let y = e.clientY - rect.top - ph / 2;
        x = Math.max(PILL_EDGE, Math.min(x, rect.width - pw - PILL_EDGE));
        y = Math.max(PILL_EDGE, Math.min(y, rect.height - ph - PILL_EDGE));
        pill.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const clearActiveCards = () => {
        document
            .querySelectorAll('.team-card.is-active')
            .forEach((card) => card.classList.remove('is-active'));
    };

    // Mouse only: cursor-following hover. Enter/move position the pill; leaving
    // the card hides it immediately.
    const handlePointerEnter = (e) => {
        if (e.pointerType !== 'mouse') return;
        e.currentTarget.classList.add('is-active');
        positionPill(e);
    };
    const handlePointerMove = (e) => {
        if (e.pointerType !== 'mouse') return;
        positionPill(e);
    };
    const handlePointerLeave = (e) => {
        // Only mouse hides on leave. Touch MUST NOT clear here - that fires right
        // after touchend and is exactly why the pill used to flash and vanish.
        if (e.pointerType !== 'mouse') return;
        e.currentTarget.classList.remove('is-active');
    };

    // Touch / pen: a real tap (pointerup fires for a tap; a scroll fires
    // pointercancel instead) toggles the pill and keeps it visible. Re-tapping
    // the same card toggles off; tapping another card switches.
    const handlePointerUp = (e) => {
        if (e.pointerType === 'mouse') return;
        const card = e.currentTarget;
        const wasActive = card.classList.contains('is-active');
        clearActiveCards();
        if (!wasActive) {
            card.classList.add('is-active');
            positionPill(e);
        }
    };

    // Dismiss a touch-pinned pill when the user taps outside the team grid or
    // scrolls the page.
    useEffect(() => {
        const onDocPointerDown = (e) => {
            if (!e.target.closest || !e.target.closest('.team-card')) {
                clearActiveCards();
            }
        };
        const onScroll = () => clearActiveCards();
        document.addEventListener('pointerdown', onDocPointerDown);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            document.removeEventListener('pointerdown', onDocPointerDown);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <section className="team-section-area">
            <div className="srcn-container">
                <div className="team-wrap">
                    <div className="team-container-header-area">
                        <div className="stats-eyebrow"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>The Team</div>
                        <h2 className="team-headline">
                            Different disciplines. Different cities.{' '}
                            <span className="team-highlight">One obsession</span> - make the work mean something.
                        </h2>
                    </div>

                    <div className="team-grid">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="team-card"
                                onPointerEnter={handlePointerEnter}
                                onPointerMove={handlePointerMove}
                                onPointerLeave={handlePointerLeave}
                                onPointerUp={handlePointerUp}
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
                                {/* Pill follows the pointer but is clamped inside
                                    this card (position:relative + overflow:hidden),
                                    so it can never leak into other sections. */}
                                <div className="team-card-badge">
                                    {member.name} - {member.role}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}