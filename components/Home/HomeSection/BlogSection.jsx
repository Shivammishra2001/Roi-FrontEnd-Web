"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { formatDate, blogCategoryName } from "../../../lib/format";

export default function BlogSection({ eyebrow, heading, viewAllLabel, viewAllHref, viewAllArrowGlyph, posts = [] }) {
    const sectionRef = useRef(null);
    const blogs = posts;

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
    }, [blogs.length]);

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
                            <span> {viewAllLabel}</span><span className="arr">{viewAllArrowGlyph}</span>
                        </Link>
                    </div>
                </div>
                
                <div className="blog-grid">
                    {blogs.map((blog) => (
                        <article className="blog-card" key={blog.id}>
                            <Link href={`/blog/${blog.slug}`} className="blog-card-wrapper">
                                <div className="blog-card-img">
                                    <figure>
                                        <img
                                            src={blog.image?.url}
                                            alt={blog.image?.alt || blog.title}
                                            width={500}
                                            height={320}
                                        />
                                    </figure>
                                </div>

                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-card-date">{formatDate(blog.date)}</span>
                                        <span className="blog-card-category">{blogCategoryName(blog)}</span>
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