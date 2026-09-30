"use client";

const BlogDetailHeroSection = ({ currentBlog, backgroundVideo }) => {
    const blog = currentBlog;

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
                {backgroundVideo?.url && <source src={backgroundVideo.url} type={backgroundVideo.mime || "video/mp4"} />}
            </video>
            <div className="container">
                <div className="case-contnet-area blog-hero-contnet-area">
                    <div className="case-label hero-small-subtitle contact-hero-badge">
                        {blog?.category}
                    </div>
                    <h1 className="case-hero-title contact-hero-title">
                        {blog?.title}
                    </h1>
                    <p className="case-hero-description blog-hero-description">
                        {blog?.excerpt || ""}
                    </p>
                </div>
                <div className="case-hero-image-wrap">
                    {blog?.coverImage?.url && (
                        <img
                            className="case-hero-image"
                            src={blog.coverImage.url}
                            alt={blog.coverImage.alt || blog.title}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogDetailHeroSection;
