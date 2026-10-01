"use client";

import React from "react";

export default function LegalHero({
    badge = "LEGAL & COMPLIANCE",
    title = "PRIVACY POLICY",
    description = "We value your trust and are dedicated to maintaining the confidentiality and integrity of your information."
}) {
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
                <div className="legal-hero-content">
                         <div className="legal-hero-badge hero-small-subtitle contact-hero-badge">
                        <span>{badge}</span>
                    </div>

                    <h1 className="legal-hero-title">
                        {title}
                    </h1>

                    <p className="legal-hero-description blog-hero-description ">
                        {description}
                    </p>
                </div>
            </div>
        </section>
        
    );
}
