"use client";

const CaseStudyDetailHeroSection = ({ currentCase }) => {
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
                        {currentCase?.subtitle || "HEALTHCARE SEO CASE STUDY"}
                    </div>
                    <h1 className="case-hero-title contact-hero-title">
                        {currentCase?.title || "Turning Healthcare Expertise into Search Authority"}
                    </h1>

                </div>
                <div className="case-hero-image-wrap">
                    <img
                        className="case-hero-image"
                        src={currentCase?.heroImage || currentCase?.image || "/images/blog1.png"}
                        alt={currentCase?.alt || currentCase?.title || "Healthcare medical team"}
                    />
                </div>
            </div>
        </section>
    );
};

export default CaseStudyDetailHeroSection;