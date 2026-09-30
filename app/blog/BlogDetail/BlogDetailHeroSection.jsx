"use client";

const BlogDetailHeroSection = ({ currentBlog, currentCase }) => {
    const blog = currentBlog || currentCase;

    return (
        <section className="case-hero-section contact-hero-section">
             <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.35,
                    zIndex: 1,
                    pointerEvents: "none"
                }}
            >
                <source src="/images/abstract_background-banner.mp4" type="video/mp4" />
            </video>
            <div className="container">
                <div className="case-contnet-area blog-hero-contnet-area">
                    <div className="case-label hero-small-subtitle contact-hero-badge">
                        {blog?.category || blog?.subtitle || "ARTICLE"}
                    </div>
                    <h1 className="case-hero-title contact-hero-title">
                        {blog?.title || "Turning Expertise into Digital Authority"}
                    </h1>
                    <p className="case-hero-description blog-hero-description">
                        {blog?.excerpt || blog?.summary || ""}
                    </p>
                </div>
                <div className="case-hero-image-wrap">
                    <img
                        className="case-hero-image"
                        src={blog?.image || blog?.heroImage || "/images/blog1.png"}
                        alt={blog?.alt || blog?.title || "Blog article"}
                    />
                </div>
            </div>
        </section>
    );
};

export default BlogDetailHeroSection;