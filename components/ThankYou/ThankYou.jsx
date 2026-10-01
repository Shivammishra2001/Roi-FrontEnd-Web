"use client";

import React from "react";
import Link from "next/link";
import "./ThankYou.css";

const steps = [
    {
        num: "01",
        title: "We review your brief",
        description: "Our team takes a close look at your requirements and understands your goals.",
    },
    {
        num: "02",
        title: "We align on goals",
        description: "We discuss the best approach, timeline and strategy to create real impact.",
    },
    {
        num: "03",
        title: "We plan the next step",
        description: "You'll get a clear plan, next steps and a dedicated team working on your project.",
    },
];

export default function ThankYou() {
    return (
        <div className="thankyou-page-root">
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
                <div className=" srcn-container">
                    <div className="thankyou-hero-content">
                        <div className="thankyou-badge contact-hero-badge">
                           
                            MESSAGE RECEIVED
                        </div>

                        <h1 className="thankyou-title ">
                            <span>Thank You!</span>
                            <span class="title-subtitle">We'll Be in Touch.</span>
                        </h1>

                        <div className="thankyou-check-circle" aria-label="Success checkmark">
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#f5c542"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>

                        <p className="thankyou-description blog-hero-description ">
                            Thanks for reaching out to ROI Mantra. Your message has been received. Our team will review your requirements and get back to you shortly.
                        </p>

                        <div className="thankyou-btn-group">
                            <Link href="/" className="thankyou-btn-primary thankyou-btn">
                                <span>Back to Home</span>
                                <span class="arr"><i class="fa fa-long-arrow-right"></i></span>
                           
                            </Link>
                            <Link href="/case-studies" className="thankyou-btn-secondary thankyou-btn">
                                <span>Explore Case Studies</span>
                               <span class="arr"><i class="fa fa-long-arrow-right"></i></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Happens Next Section */}
            <section className="thankyou-next-section">
                <div className=" srcn-container">
                    <div className="thankyou-next-container">
                        <div className="thankyou-next-tag">
                            [ WHAT HAPPENS NEXT ]
                        </div>

                        <h2 className="thankyou-next-title">
                            Good Things Start With<br />
                            A Conversation.
                        </h2>

                        <div className="thankyou-cards-grid">
                            {steps.map((step) => (
                                <div key={step.num} className="thankyou-step-card">
                                    <div className="thankyou-card-header">
                                        <span className="thankyou-step-num">{step.num}</span>
                                        <span className="thankyou-step-line"></span>
                                    </div>
                                    <h3 className="thankyou-step-title">{step.title}</h3>
                                    <p className="thankyou-step-desc">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
