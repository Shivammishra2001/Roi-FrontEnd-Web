"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { text, list, imageUrl } from "./aboutData";

const DEFAULT_PILLARS = [
  {
    nav: "One job",
    num: "01 / 04",
    acc: "One job.",
    rest: " Three surfaces.",
    desc: "Organic, paid, AI — a buyer doesn’t know the difference. Neither should the team working for them.",
    slotId: "about-pillar-1",
    placeholder: "01 · object study · One job",
    image: "/images/study-01-one-job.jpg",
  },
  {
    nav: "Cadence",
    num: "02 / 04",
    acc: "Cadence",
    rest: " over campaigns.",
    desc: "The loudest brand doesn’t win. The most present one does. Every week, every surface, every year.",
    slotId: "about-pillar-2",
    placeholder: "02 · object study · Cadence",
    image: "/images/study-02-cadence.jpg",
  },
  {
    nav: "Spend",
    num: "03 / 04",
    acc: "Spend",
    rest: " has to confess.",
    desc: "Every rupee traced. Not reported — traced. If it can’t tell us what it bought, it shouldn’t have been spent.",
    slotId: "about-pillar-3",
    placeholder: "03 · object study · Spend",
    image: "/images/study-03-spend.jpg",
  },
  {
    nav: "Behaviour",
    num: "04 / 04",
    acc: "Behaviour,",
    rest: " not impressions.",
    desc: "We don’t optimise for views. We optimise for the moment someone changes their mind.",
    slotId: "about-pillar-4",
    placeholder: "04 · object study · Behaviour",
    image: "/images/study-04-behaviour.jpg",
  },
];

export default function AboutPillarsSection(props) {
  const PILLARS_DATA = list(props.items, DEFAULT_PILLARS).map((item, i, all) => {
    const fallback = DEFAULT_PILLARS[i] || {};
    return {
      nav: text(item.nav, fallback.nav || `Pillar ${i + 1}`),
      num: text(item.number ?? item.num, fallback.num || `${String(i + 1).padStart(2, "0")} / ${String(all.length).padStart(2, "0")}`),
      acc: text(item.accent ?? item.acc, fallback.acc || ""),
      rest: typeof (item.rest ?? null) === "string" ? item.rest : fallback.rest || "",
      desc: text(item.description ?? item.desc, fallback.desc || ""),
      slotId: fallback.slotId || `about-pillar-${i + 1}`,
      placeholder: fallback.placeholder || `${String(i + 1).padStart(2, "0")} · object study`,
      image: imageUrl(item.image, fallback.image || ""),
    };
  });
  const ref = useRef(null);
  const [p, setP] = useState(0);
  const [cur, setCur] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const N = PILLARS_DATA.length;

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const isMobile = window.innerWidth <= 900;
      const stickyOffset = isMobile ? 64 : 72;
      const totalScrollable = r.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, (stickyOffset - r.top) / totalScrollable));
      setP(progress);
      const step = Math.min(N - 1, Math.floor(progress * N));
      setCur(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [N]);

  const jump = (i) => {
    const clampedIndex = Math.max(0, Math.min(N - 1, i));
    setCur(clampedIndex);
    const el = ref.current;
    if (!el) return;
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 900;
    const stickyOffset = isMobile ? 64 : 72;
    const totalScrollable = el.offsetHeight - window.innerHeight;
    if (totalScrollable > 0) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top - stickyOffset + ((clampedIndex + 0.35) / N) * totalScrollable,
        behavior: "smooth",
      });
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current || !touchStartY.current) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0 && cur < N - 1) {
        jump(cur + 1);
      } else if (diffX > 0 && cur > 0) {
        jump(cur - 1);
      }
    }
  };

  return (
    <section ref={ref} className="pillars-section-arae">
      <div 
        className="pillars-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="pillars-pl-left">
          <div className="stats-eyebrow">
            <span className="arr">
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </span>
            {text(props.eyebrow, "What We Hold True")}
          </div>
          <div className="pillars-list">
            {PILLARS_DATA.map((item, i) => (
              <button
                key={item.nav}
                type="button"
                className={`pillar-nav-btn ${i === cur ? "active" : ""}`}
                onClick={() => jump(i)}
                style={{ opacity: i === cur ? 1 : 0.28 }}
              >
                {item.nav}
              </button>
            ))}
          </div>
          <div className="pillars-bar">
            <i style={{ height: `${p * 100}%` }}></i>
          </div>
        </div>

        <div className="pillars-ph-dark">
          {PILLARS_DATA.map((item, i) => (
            <div
              key={item.slotId}
              className={`v ${i === cur ? "active" : ""}`}
              style={{
                opacity: i === cur ? 1 : 0,
                transform:
                  i === cur
                    ? "none"
                    : `scale(0.94) translateY(${i < cur ? -24 : 24}px)`,
                pointerEvents: i === cur ? "auto" : "none",
              }}
            >
              <div className="pillar-image-container">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.nav}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="pillar-image"
                    priority={i === 0}
                  />
                ) : (
                  <image-slot
                    id={item.slotId}
                    shape="rect"
                    fit="contain"
                    placeholder={item.placeholder}
                  >
                    <div className="image-slot-frame">
                      <div className="image-slot-empty">
                        <svg
                          className="image-slot-icon"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span>{item.placeholder}</span>
                      </div>
                    </div>
                  </image-slot>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pillars_pl-right">
          {PILLARS_DATA.map((item, i) => (
            <div
              key={item.nav}
              className={`item ${i === cur ? "active" : ""}`}
              style={{
                opacity: i === cur ? 1 : 0,
                transform:
                  i === cur ? "none" : `translateY(${i < cur ? -20 : 20}px)`,
                pointerEvents: i === cur ? "auto" : "none",
              }}
            >
              <div>
                <div className="pillars-n">{item.num}</div>
                <h3 className="pillars-disp">
                  <span className="pillars-acc">{item.acc}</span>
                  {item.rest}
                </h3>
              </div>
              <p className="pillars-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
