"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { text, imageUrl } from "./aboutData";

const PILLARS_DATA = [
  {
    nav: "One job",
    num: "01 / 04",
    acc: "One job.",
    rest: " Three surfaces.",
    desc: "Organic, paid, AI — a buyer doesn’t know the difference. Neither should the team working for them.",
    slotId: "about-pillar-1",
    placeholder: "01 · object study · One job",
    image: "/images/about/one-job-img.webp",
    glowColor: "rgba(245, 122, 60, 0.50)",
  },
  {
    nav: "Cadence",
    num: "02 / 04",
    acc: "Cadence",
    rest: " over campaigns.",
    desc: "The loudest brand doesn’t win. The most present one does. Every week, every surface, every year.",
    slotId: "about-pillar-2",
    placeholder: "02 · object study · Cadence",
    image: "/images/about/cadence-img.webp",
    glowColor: "rgba(245, 194, 75, 0.45)",
  },
  {
    nav: "Spend",
    num: "03 / 04",
    acc: "Spend",
    rest: " has to confess.",
    desc: "Every rupee traced. Not reported — traced. If it can’t tell us what it bought, it shouldn’t have been spent.",
    slotId: "about-pillar-3",
    placeholder: "03 · object study · Spend",
    image: "/images/about/spend-img.webp",
    glowColor: "rgba(239, 100, 50, 0.45)",
  },
  {
    nav: "Behaviour",
    num: "04 / 04",
    acc: "Behaviour,",
    rest: " not impressions.",
    desc: "We don’t optimise for views. We optimise for the moment someone changes their mind.",
    slotId: "about-pillar-4",
    placeholder: "04 · object study · Behaviour",
    image: "/images/about/behaviour-img.webp",
    glowColor: "rgba(245, 170, 60, 0.45)",
  },
];

export default function AboutPillarsSection(props) {
  // Overlay Strapi content onto the built-in structure: text + image come from
  // Strapi when present, otherwise the local fallback. Design-only fields
  // (glowColor, slotId, placeholder) always come from PILLARS_DATA.
  const strapiItems = Array.isArray(props?.items) ? props.items : [];
  const pillars = PILLARS_DATA.map((d, i) => {
    const s = strapiItems[i] || {};
    return {
      ...d,
      nav: text(s.nav, d.nav),
      num: text(s.number, d.num),
      acc: text(s.accent, d.acc),
      rest: text(s.rest, d.rest),
      desc: text(s.description, d.desc),
      image: imageUrl(s.image, d.image),
    };
  });

  const ref = useRef(null);
  const [p, setP] = useState(0);
  const [cur, setCur] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // --- Scroll-linked 3D motion for the center object ---
  // Latest scroll progress (0..1), read by the rAF loop without waiting on a
  // React re-render. cardRefs holds each pillar's .pillar-3d layer.
  const progressRef = useRef(0);
  const cardRefs = useRef([]);
  // Decaying impulse that produces a crisp flip/spin on active-step changes.
  const flipRef = useRef(0);
  const flipDirRef = useRef(1);
  const prevCurRef = useRef(0);

  const N = pillars.length;

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
      progressRef.current = progress;
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

  // Fire a flip impulse whenever the active pillar changes (tab click or scroll
  // crossing a step). Direction follows whether we moved forward or back.
  useEffect(() => {
    flipDirRef.current = cur >= prevCurRef.current ? 1 : -1;
    prevCurRef.current = cur;
    flipRef.current = 1; // energy; decays to 0 in the rAF loop below
  }, [cur]);

  // Persistent rAF loop: spring-smooths the scroll-linked 3D pose and writes it
  // straight to the DOM (no per-frame React re-render). GPU-composited transform
  // only. Skipped entirely when the OS asks to reduce motion — the CSS then
  // clears any transform so the object sits still and centered.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const s = { ry: 0, rx: 0, rz: 0, sc: 1 }; // smoothed current values

    const tick = () => {
      const prog = progressRef.current; // 0..1 through the section

      // Scroll-linked targets.
      const tRy = -18 + 36 * prog; // rotateY: -18deg -> +18deg
      const tRx = 12 - 24 * prog; //  rotateX: +12deg -> -12deg
      const tRz = -6 + 12 * prog; //  rotateZ:  -6deg -> +6deg
      // Depth "breathing": 0.96 -> 1.04 (mid) -> 0.98.
      const tSc = prog <= 0.5 ? 0.96 + 0.16 * prog : 1.04 - 0.12 * (prog - 0.5);

      // Decaying flip impulse on step change (spin + subtle scale pop).
      const flip = flipRef.current;
      flipRef.current = flip * 0.88;
      const flipRy = flip * 32 * flipDirRef.current;
      const flipSc = flip * 0.04;

      // Spring-style inertia toward the targets.
      s.ry += (tRy + flipRy - s.ry) * 0.12;
      s.rx += (tRx - s.rx) * 0.12;
      s.rz += (tRz - s.rz) * 0.12;
      s.sc += (tSc + flipSc - s.sc) * 0.14;

      const transform =
        `rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) ` +
        `rotateZ(${s.rz.toFixed(2)}deg) scale(${s.sc.toFixed(3)})`;

      for (let i = 0; i < cardRefs.current.length; i++) {
        const el = cardRefs.current[i];
        if (el) el.style.transform = transform;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

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
            What We Hold True
          </div>
          <div className="pillars-list">
            {pillars.map((item, i) => (
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
          {pillars.map((item, i) => (
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
              <div
                className="pillar-3d"
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
              <div className="pillar-image-container">
                <div
                  className="pillar-light-glow"
                  style={{
                    background: `radial-gradient(circle, ${item.glowColor || 'rgba(245, 122, 60, 0.45)'} 0%, rgba(245, 120, 50, 0.15) 45%, transparent 70%)`
                  }}
                />
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
            </div>
          ))}
        </div>

        <div className="pillars_pl-right">
          {pillars.map((item, i) => (
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
