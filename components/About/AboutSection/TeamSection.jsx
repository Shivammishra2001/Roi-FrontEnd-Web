'use client';

import React from 'react';
import Image from 'next/image';
import { text, imageUrl } from './aboutData';

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

    return (
        <section className="team-section-area">
            <div className="srcn-container">
                <div className="team-wrap">
                    <div className="team-container-header-area">
                        <div className="stats-eyebrow"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>The Team</div>
                        <h2 className="team-headline">
                            Different disciplines. Different cities.{' '}
                            <span className="team-highlight">One obsession</span> — make the work mean something.
                        </h2>
                    </div>

                    <div className="team-grid">
                        {members.map((member) => (
                            <div key={member.id} className="team-card">
                                <div className="team-card-pic">
                                    <Image
                                        src={member.img}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                        className="team-card-image"
                                    />
                                </div>
                                {/* Name/role pill lives INSIDE the card, so it can
                                    never float over the page or leak into other
                                    sections. Hover-revealed on pointer devices,
                                    always anchored in-card on touch (see About.css). */}
                                <div className="team-card-badge">
                                    {member.name} — {member.role}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}