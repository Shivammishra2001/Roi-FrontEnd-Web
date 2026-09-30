"use client";

export default function BlogHeroSetion({ badge, title, description, backgroundVideo }) {
    return (
           <section className="office-section contact-hero-section">
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
                <div className="blog-hero-contnet-area" style={{ position: "relative", zIndex: 2 }}>
                    <div className="hero-small-subtitle contact-hero-badge">
                        {badge}
                    </div>
                    <h1 className="blog-hero-title contact-hero-title">
                        {title}
                    </h1>
                    <p className="blog-hero-description ">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}