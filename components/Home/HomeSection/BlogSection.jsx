"use client";

import { useEffect, useRef } from "react";
import CmsLink from "../../common/CmsLink";
import { blogs as allBlogs } from "../../Blog/data/blogData";
import { text, list, href, mediaUrl, mediaAlt, formatDate } from "../../../lib/cms";

// Static blog data → the CMS post shape, used when the CMS sends no posts.
const DEFAULT_POSTS = allBlogs.slice(0, 3).map((blog) => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    date: blog.date,
    category: blog.category,
    href: `/blog/${blog.slug}`,
    image: { url: blog.image, alt: blog.alt || blog.title },
}));

export default function BlogSection({ data = {} }) {
    const sectionRef = useRef(null);
    const eyebrow = text(data.eyebrow, "⟶ Explore Our Latest Articles");
    const heading = text(data.heading, "Our Blog");
    const viewAllLabel = text(data.viewAllLabel, " Read the Full Article");
    const viewAllHref = href(data.viewAllHref, "/blog");
    const viewAllArrow = text(data.viewAllArrowGlyph, "↗");
    const blogs = list(data.posts, DEFAULT_POSTS).filter((post) => post && text(post.title));

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
                        <CmsLink href={viewAllHref} className="blog-btn common-wrapper-btn">
                            <span>{viewAllLabel}</span><span className="arr">{viewAllArrow}</span>
                        </CmsLink>
                    </div>
                </div>
                
                <div className="blog-grid">
                    {blogs.map((blog, i) => (
                        <article className="blog-card" key={blog.id ?? `${blog.slug}-${i}`}>
                            <CmsLink
                                href={href(blog.href, blog.slug ? `/blog/${blog.slug}` : "/blog")}
                                className="blog-card-wrapper"
                            >
                                <div className="blog-card-img">
                                    <figure>
                                        {mediaUrl(blog.image) && (
                                            <img
                                                src={mediaUrl(blog.image)}
                                                alt={mediaAlt(blog.image, blog.title)}
                                                width={500}
                                                height={320}
                                            />
                                        )}
                                    </figure>
                                </div>

                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-card-date">{formatDate(blog.date)}</span>
                                        <span className="blog-card-category">{text(blog.category)}</span>
                                    </div>
                                    <h3 className="blog-card-title">{blog.title}</h3>
                                </div>
                            </CmsLink>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
