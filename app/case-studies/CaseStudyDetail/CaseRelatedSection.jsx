"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CaseRelatedSection = ({ relatedCases = [], kicker, title, buttonLabel }) => {
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        if (!relatedCases || relatedCases.length === 0 || !swiperRef.current) {
            return;
        }

        const slider = new Swiper(swiperRef.current, {
            modules: [Navigation, Autoplay],

            slidesPerView: 3,
            spaceBetween: 28,

            speed: 750,
            loop: relatedCases.length > 3,
            grabCursor: true,
            watchOverflow: false,

            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },

            navigation: {
                nextEl: nextRef.current,
                prevEl: prevRef.current,
            },

            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                },

                576: {
                    slidesPerView: 1.15,
                    spaceBetween: 18,
                },

                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },

                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },

                1400: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });

        swiperRef.current = slider;

        return () => {
            if (slider && typeof slider.destroy === "function") {
                slider.destroy(true, true);
            }
        };
    }, [relatedCases]);

    if (!relatedCases || relatedCases.length === 0) {
        return null;
    }

    return (
        <section className="premium-case-studies">
            <div className="container">
                <div className="case-header" style={{ justifyContent: "center", }}>
                    <div
                        className="case-header-left"
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <div
                            className="case-kicker"
                            style={{ marginBottom: "8px" }}
                        >
                            <span className="arr"><i className="fa fa-long-arrow-right"></i></span> {kicker}
                        </div>
                        <h2
                            className="case-content-title"

                        >
                            {title}
                        </h2>

                    </div>
                </div>
                <div className="case-slider-area" style={{ position: "relative" }}>
                    <div className="swiper case-study-slider" ref={swiperRef}>
                        <div className="swiper-wrapper">
                            {relatedCases.map((item) => (
                                <div
                                    className="swiper-slide"
                                    key={item.id}
                                >
                                    <article className="premium-case-card">
                                        <Link
                                            href={`/case-studies/${item.slug}`}
                                            className="case-image-link"
                                        >
                                            <div className="case-image">
                                                <img
                                                    src={item.image?.url}
                                                    alt={
                                                        item.image?.alt ||
                                                        item.title
                                                    }
                                                />
                                                <div className="image-overlay"></div>
                                            </div>
                                        </Link>
                                        <div className="case-content">
                                            <span className="case-category">
                                                {item.sector}
                                            </span>
                                            <h3>
                                                <Link
                                                    href={`/case-studies/${item.slug}`}
                                                >
                                                    {item.title}
                                                </Link>
                                            </h3>
                                            <div className="case-bottom blog-contnet-btn-area">
                                                <Link
                                                    href={`/case-studies/${item.slug}`}
                                                    className="case-link work-button"
                                                >
                                                    <span>
                                                        {buttonLabel}
                                                    </span>

                                                    <span className="arr">
                                                        <i className="fa fa-long-arrow-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="case-controls">
                        <div className="case-navigation">
                            <button
                                ref={prevRef}
                                type="button"
                                className="case-prev"
                                aria-label="Previous Case Study"
                            >
                                <i className="fa fa-long-arrow-left"></i>
                            </button>
                            <button
                                ref={nextRef}
                                type="button"
                                className="case-next"
                                aria-label="Next Case Study"
                            >
                                <i className="fa fa-long-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CaseRelatedSection;