"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

// The CMS date field is ISO "YYYY-MM-DD"; the original design shows
// "September 29, 2025". Format manually (not via Date/toLocaleDateString)
// to avoid any timezone-dependent off-by-one-day rendering.
function formatDate(iso) {
    const [year, month, day] = iso.split("-").map(Number);
    return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export default function BlogSection({ eyebrow, heading, viewAllLabel, viewAllHref, viewAllArrowGlyph, posts }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cards = section.querySelectorAll(".blog-card");

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add("show");
                        }, index * 150);
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="blog-section-area" ref={sectionRef}>
            <div className="srcn-container">
                <div className="blog-subtitle Believe-subtitle">
                    <span>{eyebrow}</span>
                </div>
                <div className="work-header">
                    <h2 className="common-top-heading page-title">
                        {heading}
                    </h2>
                    <div className="blog-btn-wrap">
                        <Link href={viewAllHref} className="blog-btn common-wrapper-btn">
                            <span>{viewAllLabel}</span><span className="arr">{viewAllArrowGlyph}</span>
                        </Link>
                    </div>
                </div>

                <div className="blog-grid">
                    {posts.map((blog) => (
                        <article className="blog-card" key={blog.id}>
                            <Link href={blog.href} className="blog-card-wrapper">
                                <div className="blog-card-img">
                                    <figure>
                                        <img
                                            src={blog.image.url}
                                            alt={blog.image.alt || blog.title}
                                            width={500}
                                            height={320}
                                        />
                                    </figure>
                                </div>

                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-card-date">{formatDate(blog.date)}</span>
                                        <span className="blog-card-category">{blog.category}</span>
                                    </div>
                                    <h3 className="blog-card-title">{blog.title}</h3>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
