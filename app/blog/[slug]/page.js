import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogs } from "../../../components/Blog/data/blogData";

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams?.slug);
  if (!blog) return { title: 'Article not found | ROI Mantra' };
  return {
    title: `${blog.title} | ROI Mantra`,
    description: blog.excerpt || blog.content?.replace(/<[^>]*>?/gm, '').slice(0, 160),
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams?.slug);

  if (!blog) return notFound();

  // Popular blogs for sidebar (excluding current blog)
  const popularBlogs = blogs.filter((b) => b.id !== blog.id).slice(0, 4);

  // Related blogs for bottom section (excluding current blog)
  const relatedBlogs = blogs.filter((b) => b.id !== blog.id).slice(0, 3);

  const isHtml = blog.content && blog.content.includes('<');

  return (
    <article className="blog-detail-page">
      {/* Hero Header Section */}
      <header className="blog-detail-hero">
        <div className="srcn-container">
          <div className="blog-detail-header-content">
            <h1 className="blog-detail-title">{blog.title}</h1>
          </div>
        </div>
      </header>

      {/* Main Content Area (Article + Sidebar) */}
      <section className="blog-detail-main">
        <div className="srcn-container">
          <div className="blog-detail-layout">
            {/* Left Main Article Column */}
            <div className="blog-detail-content-col">
              {/* Featured Image */}
              <div className="blog-detail-img-wrap">
                <Image
                  src={blog.image}
                  alt={blog.alt || blog.title}
                  width={1200}
                  height={675}
                  className="blog-detail-img"
                  priority
                />
              </div>

              {/* Meta Bar Below Featured Image */}
              <div className="blog-detail-meta">
                <span className="meta-item">
                  <i className="fa fa-calendar" aria-hidden="true"></i> {blog.date}
                </span>
                <span className="meta-item meta-category">
                  <i className="fa fa-tag" aria-hidden="true"></i> {blog.category}
                </span>
                <span className="meta-item">
                  <i className="fa fa-user-o" aria-hidden="true"></i> ROI Mantra Team
                </span>
              </div>

              {/* Article Content Body (HTML h2, h3, p, a, ul, li) */}
              {isHtml ? (
                <div
                  className="blog-detail-body"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              ) : (
                <div className="blog-detail-body">
                  {blog.content ? (
                    blog.content.split('\n\n').map((block, index) => {
                      const trimmed = block.trim();
                      if (!trimmed) return null;
                      const isHeading = trimmed.length < 80 && !trimmed.endsWith('.') && !trimmed.endsWith(':');
                      if (isHeading) {
                        return <h2 key={index}>{trimmed}</h2>;
                      }
                      return <p key={index}>{trimmed}</p>;
                    })
                  ) : (
                    <p>No content available.</p>
                  )}
                </div>
              )}
            </div>

            {/* Right Sidebar Column (Popular Blogs Widget) */}
            <aside className="blog-detail-sidebar">
              <div className="sidebar-widget popular-blogs-widget">
                <h3 className="widget-title">Popular Blogs</h3>
                <div className="popular-blogs-list">
                  {popularBlogs.map((popBlog) => (
                    <Link
                      href={`/blog/${popBlog.slug}`}
                      className="popular-blog-item"
                      key={popBlog.id}
                    >
                      <div className="popular-blog-img">
                        <img src={popBlog.image} alt={popBlog.title} />
                      </div>
                      <div className="popular-blog-info">
                        <span className="popular-blog-category">{popBlog.category}</span>
                        <h4 className="popular-blog-title">{popBlog.title}</h4>
                        <span className="popular-blog-date">{popBlog.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom Related Articles Section */}
          <div className="related-articles-section">
            <div className="related-header">
              <h2 className="related-title">Related Articles</h2>
              <Link href="/blog" className="common-wrapper-btn">
                <span>View All Articles</span> <span className="arr">↗</span>
              </Link>
            </div>
            <div className="blog-grid">
              {relatedBlogs.map((relBlog) => (
                <article className="blog-card" key={relBlog.id}>
                  <Link href={`/blog/${relBlog.slug}`} className="blog-card-wrapper">
                    <div className="blog-card-img">
                      <figure>
                        <img
                          src={relBlog.image}
                          alt={relBlog.alt || relBlog.title}
                          width={500}
                          height={320}
                        />
                      </figure>
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        <span className="blog-card-date">{relBlog.date}</span>
                        <span className="blog-card-category">{relBlog.category}</span>
                      </div>
                      <h3 className="blog-card-title">{relBlog.title}</h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
