"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WorkLookBanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-look-banner",
        {
          xPercent: 100,
        },
        {
          xPercent: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-look-banner",
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ".work-look-video",
        {
          scale: 1.25,
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".work-look-banner",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        ".recent-text",
        {
          x: 300,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-look-banner",
            start: "top 80%",
            end: "center center",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ".work-text",
        {
          x: -300,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-look-banner",
            start: "top 80%",
            end: "center center",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="work-look-banner" ref={sectionRef}>
      <video
        className="work-look-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/video/work-look-banner.mp4"
          type="video/mp4"
        />
      </video>

      <div className="work-look-container">
        <div className="srcn-container">
          <h2 className="recent-text work-look-title">
            This is what the
          </h2>

          <h2 className="work-text work-look-title">
            work looks like.
          </h2>
        </div>
      </div>
    </section>
  );
}