"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function LogoSlider({ logos: cmsLogos = [] }) {
  const logos = cmsLogos.filter((logo) => logo?.url);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="logo-slider-section">
      <div className="logo-slider-wrap">

        <Swiper
          className="logoSwiper"
          modules={[Navigation]}
          loop={true}
          speed={700}
          slidesPerView={5}
          spaceBetween={20}

          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;

              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}

          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="logo-card">
                <img
                  src={logo.url}
                  alt={logo.alt}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* PREVIOUS */}
        <button
          ref={prevRef}
          type="button"
          className="logo-prev"
          aria-label="Previous logo"
        >
          <i className="fa fa-long-arrow-left"></i>
        </button>

        {/* NEXT */}
        <button
          ref={nextRef}
          type="button"
          className="logo-next"
          aria-label="Next logo"
        >
          <i className="fa fa-long-arrow-right"></i>
        </button>

      </div>
    </section>
  );
}