"use client";

import { useEffect, useRef } from "react";
import CmsLink from "../../common/CmsLink";
import { text, href, mediaUrl } from "../../../lib/cms";

export default function TalkDiscoverySection({ data = {} }) {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  const title = text(data.title, "LET'S TALK DISCOVERY.");
  const bodyText = text(
    data.bodyText,
    "Where you're showing up. Where you're not. What's leaking. What the next twelve months should look like."
  );
  const ctaLabel = text(data.ctaLabel, "Start a conversation");
  const ctaHref = href(data.ctaHref, "/contact");
  const ctaArrow = text(data.ctaArrowGlyph, "↗");
  const video = data.backgroundVideo || {};
  const videoUrl = mediaUrl(video.url, "/video/animation.mp4");
  const poster = text(video.poster) || undefined;

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
      if (char === " ") letter.innerHTML = "&nbsp;";
      else letter.textContent = char;

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
        <video
          key={videoUrl}
          autoPlay={video.autoplay ?? true}
          muted={video.muted ?? true}
          loop={video.loop ?? true}
          playsInline
          poster={poster}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      <div className="srcn-container">
        <div className="talk-discovery-wrapper-top-box">
          <h2
            className="talk-discovery-title"
            ref={titleRef}
            aria-label={title}
          ></h2>

          <div className="talk-discovery-text">
            <p>{bodyText}</p>
          </div>

          <div className="talk-discovery-btn-wrap">
            <CmsLink href={ctaHref} className="talk-discovery-btn">
              <span>{ctaLabel}</span>
             <span className="arr">{ctaArrow}</span>
            </CmsLink>
          </div>
        </div>
      </div>
    </section>
  );
}
