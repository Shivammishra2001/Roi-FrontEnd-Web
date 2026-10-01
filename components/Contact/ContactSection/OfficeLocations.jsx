"use client";

import { useEffect, useState } from "react";

const officeData = [

    {
        city: "Noida",
        image: "/images/noida.gif",
        address:
            "A61/B4, Spring Meadows Business Park, Sector 63, Noida, Uttar Pradesh, India.",
        email: "info@roimantra.com",
        //  phone: "+91 124 665 6000",
        direction:
            "https://www.google.com/maps/search/?api=1&query=Noida+Sector+63",
        dot: "#ff851b",
    },

    {
        city: "Bengaluru",
        image: "/images/Bangalore.gif",
        address:
            "Bengaluru, Rajasthan - 302001, India",
        email: "info@adglobal360.com",
        direction: "https://www.google.com/maps/search/?api=1&query=Jaipur",
        dot: "#e6c400",
    },
    {
        city: "Mumbai",
        image: "/images/Mumbai..gif",
        address:
            "Tower A, Cyber City, Mumbai, Haryana - 122002, India",
        email: "info@adglobal360.com",
        direction: "https://www.google.com/maps/search/?api=1&query=Gurugram",
        dot: "#00aF83",
    },
    {
        city: "Boston",
        image: "/images/Boston.gif",
        address:
            "Boston, Tamil Nadu - 600001, India",
        email: "info@adglobal360.com",
        direction:
            "https://www.google.com/maps/search/?api=1&query=Chennai",
        dot: "#159bc8",
    },
    {
        city: "Canada",
        image: "/images/Canada.gif",
        address:
            "Canada, Karnataka - 560001, India",
        email: "info@adglobal360.com",
        direction:
            "https://www.google.com/maps/search/?api=1&query=Bangalore",
        dot: "#00a878",
    },
    {
        city: "Dubai",
        image: "/images/Dubai.gif",
        address:
            "4WB 253, DAFZA (Dubai Airport Free Zone), Dubai, United Arab Emirates.",
        email: "info@adglobal360.com",
        direction:
            "https://www.google.com/maps/search/?api=1&query=Mohali",
        dot: "#ff6b35",
    },
];

export default function OfficeLocations() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeOffice = officeData[activeIndex];

    useEffect(() => {
        const rotationTimer = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % officeData.length);
        }, 7200);

        return () => window.clearInterval(rotationTimer);
    }, []);

    return (
        <section className="office-section contact-hero-section">
            <video
                autoPlay
                muted
                loop
                playsInline
            >
                <source
                    src="/images/abstract_background-banner.mp4"
                    type="video/mp4"
                />
            </video>
            <div className="srcn-container">
                <div className="office-content">
                    <div className="office-intro">
                        <div className="contact-hero-badge">
                            <span>Reach Out</span>
                        </div>
                        <h1 className="contact-hero-title">
                            Get In Touch  With Us
                        </h1>
                    </div>
                    <div className="office-image-area">
                        <div
                            key={activeOffice.city}
                            className="office-image-card owl-item animated owl-animated-in"
                        >
                            <img
                                src={activeOffice.image}
                                alt={activeOffice.city}
                                onError={(event) => {
                                    event.currentTarget.onerror = null;
                                    event.currentTarget.src = '/images/real-estate-img.jpg';
                                }}
                            />
                        </div>
                    </div>
                    <div
                        key={`${activeOffice.city}-details`}
                        className="office-info owl-item animated owl-animated-in"
                    >
                        <h3 className="office-city-title">{activeOffice.city}</h3>
                        <p className="office-address">
                            <span className="mail-icon">
                                <img
                                    src="/images/location-icon.png"
                                    alt=""
                                />
                            </span>
                            <span>{activeOffice.address}</span>
                        </p>
                        <a
                            href={`mailto:${activeOffice.email}`}
                            className="office-mail"
                        >
                            <span className="mail-icon">
                                <img
                                    src="/images/sms-icon.png"
                                    alt=""
                                />
                            </span>
                            <span>{activeOffice.email}</span>
                        </a>
                        {/* <a  href={`tel:${activeOffice.phone}`}
                            className="office-phone office-mail"
                        >
                            <span className="mail-icon">
                                <img
                                    src="/images/phone-icon.png"
                                    alt=""
                                />
                            </span>
                            <span>{activeOffice.phone}</span>
                        </a> */}
                        <a
                            href={activeOffice.direction}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="office-direction"
                        >
                            Direction
                            <span className="arr" aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>

            </div>
            <div className="office-city-area">

                <div className="office-city-nav">
                    <div className="office-city-list">
                        {officeData.map((office, index) => (
                            <button
                                key={office.city}
                                type="button"
                                className={`office-city-btn owl-item animated ${activeIndex === index ? "active owl-animated-in" : ""
                                    }`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <span
                                    className="city-dot "
                                    style={{
                                        backgroundColor: office.dot,
                                    }}
                                ></span>

                                <span>{office.city}</span>

                                {activeIndex === index && (
                                    <span
                                        className="city-active-line"
                                        style={{
                                            backgroundColor: office.dot,
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