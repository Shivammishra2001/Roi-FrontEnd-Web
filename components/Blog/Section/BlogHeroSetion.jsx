"use client";

export default function BlogHeroSetion() {
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
                <source src="/images/abstract_background-banner.mp4" type="video/mp4" />
            </video>
            <div className="container">
                <div className="blog-hero-contnet-area" style={{ position: "relative", zIndex: 2 }}>
                    <div className="hero-small-subtitle contact-hero-badge">
                        Our Work
                    </div>
                    <h1 className="blog-hero-title contact-hero-title">
                        Work that moved the number.
                    </h1>
                    <p className="blog-hero-description ">
                        We build innovative digital solutions that simplify
                        complex challenges, accelerate growth, improve
                        efficiency, and create lasting business impact.
                    </p>
                </div>
            </div>
        </section>
    );
}