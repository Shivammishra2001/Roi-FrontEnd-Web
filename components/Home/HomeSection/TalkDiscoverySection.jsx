"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";


export default function TalkDiscoverySection() {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const title = "LET'S TALK DISCOVERY.";

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
  }, []);

  return (
    <section
      id="talk-discovery"
      ref={sectionRef}
      className="talk-discovery-section"
    >
      <div className="talk-discovery-bg-video" aria-hidden="true">
        <video autoPlay muted loop playsInline>
          <source src="/video/animation.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="srcn-container">
        <div className="talk-discovery-wrapper-top-box">
          <h2
            className="talk-discovery-title"
            ref={titleRef}
          ></h2>

          <div className="talk-discovery-text">
            <p>
              Where you're showing up. Where you're not. What's leaking.
              What the next twelve months should look like.
            </p>
          </div>

          <div className="talk-discovery-btn-wrap">
            <Link href="/contact" className="talk-discovery-btn">
              <span>Start a conversation</span>
             <span className="arr">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}