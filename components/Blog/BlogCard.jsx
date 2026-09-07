'use client';
import Link from 'next/link';

export default function BlogCard({ blogs = [] }) {
  if (!blogs.length) {
    return (
      <div className="srcn-container">
        <p className="blog-empty">No articles yet — check back soon.</p>
      </div>
    );
  }

  return (
    <section className="blog-grid-section blog-section-area">
      <div className="srcn-container">
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
                      height={360}
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
