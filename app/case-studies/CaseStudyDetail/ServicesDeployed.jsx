"use client";

import { useEffect, useRef, useState } from "react";

const defaultServices = [
  {
    type: "Channel",
    title: "Paid media",
    description: "What was set up, and how it was structured.",
  },
  {
    type: "Channel",
    title: "SEO",
    description: "What was audited, fixed, and built.",
  },
  {
    type: "Craft",
    title: "Content & social",
    description: "Formats, cadence, and the editorial line.",
  },
  {
    type: "Systems",
    title: "Measurement",
    description: "Tracking, attribution, and reporting cadence.",
  },
];

export default function ServicesDeployed({ currentCase }) {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const services = currentCase?.services || defaultServices;
  const slides =
    currentCase?.slides && currentCase.slides.length > 0
      ? currentCase.slides
      : [
          {
            image:
              currentCase?.heroImage ||
              currentCase?.image ||
              "/images/services-banner.png",
            alt: currentCase?.title
              ? `${currentCase.title} creative`
              : "Campaign creative",
          },
          {
            image: "/images/graphic-era-hospital2.jpg",
            alt: "Search strategy",
          },
          {
            image: "/images/graphic-era-hospital3.jpg",
            alt: "Dashboard result",
          },
        ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextLightboxSlide = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % slides.length);
  };

  const prevLightboxSlide = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Keyboard navigation & scroll lock for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % slides.length);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, slides.length]);

  // Touch swipe support for lightbox
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      nextLightboxSlide();
    } else if (distance < -50) {
      prevLightboxSlide();
    }
  };

  // Mobile inline slider sync
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateSlide = () => {
      if (window.innerWidth > 600) return;
      const boxes = slider.querySelectorAll(".media-box");
      if (!boxes.length) return;

      let closestIndex = 0;
      let smallestDistance = Infinity;

      boxes.forEach((box, index) => {
        const distance = Math.abs(slider.scrollLeft - box.offsetLeft);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentSlide(closestIndex);
    };

    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateSlide, 100);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 600) return;

    const interval = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const next =
        currentSlide + 1 >= Math.min(slides.length, 3) ? 0 : currentSlide + 1;
      const slide = slider.querySelectorAll(".media-box")[next];
      if (!slide) return;

      slider.scrollTo({
        left: slide.offsetLeft - slider.offsetLeft,
        behavior: "smooth",
      });

      setCurrentSlide(next);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  const goToSlide = (index) => {
    const slider = sliderRef.current;
    if (!slider || window.innerWidth > 600) return;

    const slide = slider.querySelectorAll(".media-box")[index];
    if (!slide) return;

    slider.scrollTo({
      left: slide.offsetLeft - slider.offsetLeft,
      behavior: "smooth",
    });

    setCurrentSlide(index);
  };

  const visibleSlides = slides.slice(0, 3);
  const extraCount = slides.length > 3 ? slides.length - 3 : 0;

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-container">
          
          <div className="section-label case-kicker">
            <span class="arr"><i class="fa fa-long-arrow-right"> </i>  </span> 
            <span>PROJECT</span>
          </div>
          <h2 className="services-title">Project Gallery</h2>

          {/* 3-Box Media Grid Layout (1 Large Left + 2 Small Right) */}
          <div className="media-grid" ref={sliderRef}>
            {slides[0] && (
              <div
                className="media-box media-large"
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(0)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(0);
                  }
                }}
                title="Click to expand"
              >
                <img
                  src={slides[0].image}
                  alt={slides[0].alt || "Campaign creative"}
                />
                <div className="media-zoom-overlay">
                  <span className="media-zoom-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </span>
                </div>
              </div>
            )}

            {slides.length > 1 && (
              <div className="media-right">
                {slides[1] && (
                  <div
                    className="media-box media-small"
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(1)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox(1);
                      }
                    }}
                    title="Click to expand"
                  >
                    <img
                      src={slides[1].image}
                      alt={slides[1].alt || "Service creative"}
                    />
                    <div className="media-zoom-overlay">
                      <span className="media-zoom-icon">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                      </span>
                    </div>
                  </div>
                )}

                {slides[2] && (
                  <div
                    className="media-box media-small"
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(2)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox(2);
                      }
                    }}
                    title="Click to expand"
                  >
                    <img
                      src={slides[2].image}
                      alt={slides[2].alt || "Dashboard result"}
                    />
                    {extraCount > 0 && (
                      <div className="media-more-overlay">
                        <span>+{extraCount} More</span>
                      </div>
                    )}
                    <div className="media-zoom-overlay">
                      <span className="media-zoom-icon">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile dots */}
          <div className="mobile-dots">
            {visibleSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`mobile-dot ${
                  currentSlide === index ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Popup Modal with Slider for ALL images */}
      {isLightboxOpen && (
        <div
          className="services-lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview modal"
        >
          <div
            className="services-lightbox-top"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="services-lightbox-meta">
              <span className="services-lightbox-counter">
                {lightboxIndex + 1} / {slides.length}
              </span>
              {slides[lightboxIndex]?.alt && (
                <span className="services-lightbox-title">
                  {slides[lightboxIndex].alt}
                </span>
              )}
            </div>

            <button
              type="button"
              className="services-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close modal"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div
            className="services-lightbox-body"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {slides.length > 1 && (
              <button
                type="button"
                className="services-lightbox-arrow services-lightbox-prev"
                onClick={prevLightboxSlide}
                aria-label="Previous slide"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            <div className="services-lightbox-image-holder">
              <img
                key={lightboxIndex}
                src={slides[lightboxIndex]?.image}
                alt={slides[lightboxIndex]?.alt || "Slide preview"}
                className="services-lightbox-image"
              />
            </div>

            {slides.length > 1 && (
              <button
                type="button"
                className="services-lightbox-arrow services-lightbox-next"
                onClick={nextLightboxSlide}
                aria-label="Next slide"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
          </div>

          {slides.length > 1 && (
            <div
              className="services-lightbox-thumbs"
              onClick={(e) => e.stopPropagation()}
            >
              {slides.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`services-lightbox-thumb ${
                    idx === lightboxIndex ? "active" : ""
                  }`}
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <img src={s.image} alt={s.alt || `Thumb ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}