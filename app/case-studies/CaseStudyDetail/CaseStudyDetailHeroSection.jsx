"use client";

const CaseStudyDetailHeroSection = ({ currentCase, backgroundVideo }) => {
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
                        {currentCase?.subtitle}
                    </div>
                    <h1 className="case-hero-title contact-hero-title">
                        {currentCase?.title}
                    </h1>
                    <p className="case-hero-description blog-hero-description">
                        {currentCase?.summary}
                    </p>
                </div>
                <div className="case-hero-image-wrap">
                    {(currentCase?.heroImage?.url || currentCase?.image?.url) && (
                        <img
                            className="case-hero-image"
                            src={currentCase.heroImage?.url || currentCase.image?.url}
                            alt={currentCase.heroImage?.alt || currentCase.title}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default CaseStudyDetailHeroSection;