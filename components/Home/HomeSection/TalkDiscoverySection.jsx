"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import useNearViewport from "../../useNearViewport";


export default function TalkDiscoverySection({ backgroundVideo, title = "", bodyText, ctaLabel, ctaHref, ctaArrowGlyph }) {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  // The background video (large) is only fetched when the section is near.
  const videoNear = useNearViewport(sectionRef);
  const autoplay = backgroundVideo?.autoplay !== false;

  useEffect(() => {
    const video = videoRef.current;
    if (!videoNear || !video) return;
    video.load();
    if (autoplay) video.play().catch(() => {});
  }, [videoNear, autoplay]);

  useEffect(() => {
    const titleBox = titleRef.current;
    const section = sectionRef.current;

    if (!titleBox || !section) return;

    titleBox.innerHTML = "";

    title.split("").forEach((char, index) => {
      const wrap = document.createElement("span");
      wrap.className = "letter-wrap";

      const letter = document.createElement("span");
      letter.className = "letter";
      letter.style.transitionDelay = `${index * 35}ms`;
      letter.innerHTML = char === " " ? "&nbsp;" : char;

      wrap.appendChild(letter);
      titleBox.appendChild(wrap);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("show");
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [title]);

  return (
    <section
      id="talk-discovery"
      ref={sectionRef}
      className="talk-discovery-section"
    >
      <div className="talk-discovery-bg-video" aria-hidden="true">
        {backgroundVideo?.url && (
          <video
            ref={videoRef}
            muted={backgroundVideo.muted !== false}
            loop={backgroundVideo.loop !== false}
            playsInline
            preload="none"
            poster={backgroundVideo.poster || undefined}
          >
            {videoNear && <source src={backgroundVideo.url} type="video/mp4" />}
          </video>
        )}
      </div>

      <div className="srcn-container">
        <div className="talk-discovery-wrapper-top-box">
          <h2
            className="talk-discovery-title"
            ref={titleRef}
          ></h2>

          <div className="talk-discovery-text">
            <p>
              {bodyText}
            </p>
          </div>

          <div className="talk-discovery-btn-wrap">
            <Link href={ctaHref} className="talk-discovery-btn">
              <span>{ctaLabel}</span>
             <span className="arr">{ctaArrowGlyph}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}