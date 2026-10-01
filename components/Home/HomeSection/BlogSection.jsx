"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { blogs as allBlogs } from "../../Blog/data/blogData";

export default function BlogSection() {
    const sectionRef = useRef(null);
    const blogs = allBlogs.slice(0, 3);

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
                    <span>⟶ Explore Our Latest Articles</span>
                </div>
                <div className="work-header">
                    <h2 className="common-top-heading page-title">
                        Our Blog
                    </h2>
                    <div className="blog-btn-wrap">
                        <Link href="/blog" className="blog-btn common-wrapper-btn">
                            <span> Read the Full Article</span><span className="arr">↗</span>
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
                                            src={blog.image}
                                            alt={blog.alt || blog.title}
                                            width={500}
                                            height={320}
                                        />
                                    </figure>
                                </div>

                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-card-date">{blog.date}</span>
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