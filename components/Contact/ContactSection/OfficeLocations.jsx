"use client";

import { useState } from "react";

export default function OfficeLocations({ badge, title, backgroundVideo, fallbackImage, directionLabel, offices = [] }) {
    const officeData = offices;
    const [activeIndex, setActiveIndex] = useState(0);
    const activeOffice = officeData[activeIndex] || officeData[0];
    // Offices without an email (e.g. Dubai) get no mail row at all.
    const activeEmail = typeof activeOffice?.email === "string" ? activeOffice.email.trim() : "";

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
                            {/* An MP4 is far lighter than the same animation as a
                                GIF; it plays the same way (muted, looping). */}
                            {activeOffice.image?.url && activeOffice.image.mime?.startsWith("video/") ? (
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                    aria-label={activeOffice.city}
                                >
                                    <source src={activeOffice.image.url} type={activeOffice.image.mime} />
                                </video>
                            ) : (
                                <img
                                    src={activeOffice.image?.url || fallbackImage?.url}
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
                        <p className={`office-address${activeEmail ? "" : " office-address--last"}`}>
                            <span className="mail-icon">
                                <img
                                    src="/images/location-icon.png"
                                    alt=""
                                />
                            </span>
                            <span>{activeOffice.address}</span>
                        </p>
                        {activeEmail && (
                            <a
                                href={`mailto:${activeEmail}`}
                                className="office-mail"
                            >
                                <span className="mail-icon">
                                    <img
                                        src="/images/sms-icon.png"
                                        alt=""
                                    />
                                </span>
                                <span>{activeEmail}</span>
                            </a>
                        )}
                        <a
                            href={activeOffice.directionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="office-direction"
                        >
                            {directionLabel}
                            <span className="arr" aria-hidden="true">↗</span>
                        </a>
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