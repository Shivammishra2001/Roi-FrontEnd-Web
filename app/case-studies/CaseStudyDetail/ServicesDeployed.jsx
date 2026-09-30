"use client";

import { useEffect, useRef, useState } from "react";



export default function ServicesDeployed({ currentCase, label, title }) {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = currentCase?.servicesDeployed || [];
  const slides = currentCase?.gallery || [];

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
        const distance = Math.abs(
          slider.scrollLeft - box.offsetLeft
        );

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
        currentSlide + 1 >= slides.length
          ? 0
          : currentSlide + 1;

      const slide = slider.querySelectorAll(".media-box")[next];

      if (!slide) return;

      slider.scrollTo({
        left: slide.offsetLeft - slider.offsetLeft,
        behavior: "smooth",
      });

      setCurrentSlide(next);
    }, 3000);

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

  return (
    <section className="services-section" id="services">
         <div className="container">

       
      <div className="services-container">
        <div className="section-label case-kicker">
          <span>{label}</span>
        </div>
        <h2 className="services-title">
          {title}
        </h2>
        <div className="service-list">
          {services.map((service, index) => (
            <div
              className={`service-card service-card-${index + 1}`}
              key={index}
            >
              <div className="service-line"></div>

              <div className="service-type">
                {service.type}
              </div>

              <h3 className="service-card-title">
                {service.title}
              </h3>

              <p className="service-description case-content-text">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        <div
          className="media-grid"
          ref={sliderRef}
        >
          <div className="media-box media-large">
            <img
              src={slides[0]?.url}
              alt={slides[0]?.alt || "Campaign creative"}
            />

      
          </div>
          <div className="media-right">

            <div className="media-box media-small">
              <img
                src={slides[1]?.url}
                alt={slides[1]?.alt || "Service creative"}
              />

             
            </div>

            <div className="media-box media-small">
              <img
                src={slides[2]?.url}
                alt={slides[2]?.alt || "Dashboard result"}
              />

             
            </div>

          </div>
        </div>
        <div className="mobile-dots">
          {slides.map((_, index) => (
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
    </section>
  );
}