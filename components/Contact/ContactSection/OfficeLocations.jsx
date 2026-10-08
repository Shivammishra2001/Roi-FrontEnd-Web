"use client";

import { useEffect, useState } from "react";
import { cleanText } from "../../../lib/format";

export default function OfficeLocations({ badge, title, backgroundVideo, fallbackImage, directionLabel, offices = [] }) {
    const officeData = offices;
    const [activeIndex, setActiveIndex] = useState(0);
    const activeOffice = officeData[activeIndex] || officeData[0];

    // Optional contact fields: a blank one hides its whole row, icon included.
    const address = cleanText(activeOffice?.address);
    const email = cleanText(activeOffice?.email ?? activeOffice?.mail);
    const directionUrl = cleanText(activeOffice?.directionUrl);
    const imageUrl = cleanText(activeOffice?.image?.url || fallbackImage?.url);

    useEffect(() => {
        if (officeData.length < 2) return undefined;

        const rotationTimer = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % officeData.length);
        }, 7200);

        return () => window.clearInterval(rotationTimer);
    }, [officeData.length]);

    return (
        <section className="office-section contact-hero-section">
            <video
                autoPlay
                muted
                loop
                playsInline
            >
                {backgroundVideo?.url && (
                    <source
                        src={backgroundVideo.url}
                        type={backgroundVideo.mime || "video/mp4"}
                    />
                )}
            </video>
            <div className="srcn-container">
                <div className="office-content">
                    <div className="office-intro">
                        <div className="contact-hero-badge">
                            <span>{badge}</span>
                        </div>
                        <h1 className="contact-hero-title">
                            {title}
                        </h1>
                    </div>
                    {activeOffice && (<>
                    <div className="office-image-area">
                        <div
                            key={activeOffice.city}
                            className="office-image-card owl-item animated owl-animated-in"
                        >
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={activeOffice.city}
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        if (fallbackImage?.url) event.currentTarget.src = fallbackImage.url;
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div
                        key={`${activeOffice.city}-details`}
                        className="office-info owl-item animated owl-animated-in"
                    >
                        <h3 className="office-city-title">{activeOffice.city}</h3>
                        {address && (
                            <p className="office-address">
                                <span className="mail-icon">
                                    <img
                                        src="/images/location-icon.png"
                                        alt=""
                                    />
                                </span>
                                <span>{address}</span>
                            </p>
                        )}
                        {email && (
                            <a
                                href={`mailto:${email}`}
                                className="office-mail"
                            >
                                <span className="mail-icon">
                                    <img
                                        src="/images/sms-icon.png"
                                        alt=""
                                    />
                                </span>
                                <span>{email}</span>
                            </a>
                        )}
                        {directionUrl && (
                            <a
                                href={directionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="office-direction"
                            >
                                {directionLabel}
                                <span className="arr" aria-hidden="true">↗</span>
                            </a>
                        )}
                    </div>
                    </>)}
                </div>

            </div>
            <div className="office-city-area">

                <div className="office-city-nav">
                    <div className="office-city-list">
                        {officeData.map((office, index) => (
                            <button
                                key={`${office.city}-${index}`}
                                type="button"
                                className={`office-city-btn owl-item animated ${activeIndex === index ? "active owl-animated-in" : ""
                                    }`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <span
                                    className="city-dot "
                                    style={{
                                        backgroundColor: office.dotColor,
                                    }}
                                ></span>

                                <span>{office.city}</span>

                                {activeIndex === index && (
                                    <span
                                        className="city-active-line"
                                        style={{
                                            backgroundColor: office.dotColor,
                                        }}
                                    ></span>
                                )}

                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}