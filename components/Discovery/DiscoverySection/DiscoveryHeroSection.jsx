"use client";

import { text, list } from "@/lib/cms";

const DEFAULT_BUTTONS = [
    { label: "The Work", href: "#case-studies" },
    { label: "How it works", href: "#discovery-how" },
];

// Strapi `sections.discovery-hero`; blank fields fall back to the built-in copy.
export default function DiscoveryHeroSection({ badge, headingLine1, headingLine2, buttons, backgroundVideo }) {
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
                <source
                    src={backgroundVideo?.url || "/images/abstract_background-banner.mp4"}
                    type={backgroundVideo?.mime || "video/mp4"}
                />
            </video>
            <div className="srcn-container">
                <div className="blog-hero-contnet-area" style={{ position: "relative", zIndex: 2 }}>
                    <div className="hero-small-subtitle contact-hero-badge">
                        {text(badge, "Pillar 01 · Organic Discovery")}
                    </div>
                    <h1 className="discovery-heading">
                        {text(headingLine1, "One asset. Every surface.")}
                        <span className="case-study-hero-line">
                            {text(headingLine2, "Measured against the outcome.")}
                        </span>

                    </h1>


                    <div
                        className="hero-buttons discovery-row reveal-up is-in"
                        style={{ transitionDelay: "900ms" }}
                    >
                        {list(buttons, DEFAULT_BUTTONS).map((button, index) => (
                            <a
                                key={index}
                                href={button.href}
                                className="discovery-row-btn dark work-buttons"
                                {...(button.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                                {button.label}
                                <span className="arr">
                                    <i className="fa fa-long-arrow-right"></i>
                                </span>
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
