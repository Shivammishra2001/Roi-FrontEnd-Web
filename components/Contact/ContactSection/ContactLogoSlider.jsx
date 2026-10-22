"use client";

import React, { useCallback, useEffect, useRef } from "react";

// Continuous scroll speed of the strip, and how long an arrow click takes
// to move it by one card.
const SPEED_PX_PER_SECOND = 45;
const ARROW_SHIFT_MS = 450;

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * Client logo cards (Contact page): a strip that scrolls continuously and
 * loops without a gap. It pauses while the pointer is over the cards; the
 * arrows move it one card back or forward, then it carries on scrolling.
 *
 * The cards are repeated several times in one track. The track position (x)
 * is kept within the second copy, and moving it by exactly one copy's width
 * looks identical, so the loop is seamless. Card widths come from CSS
 * (Contact.css, .logo-marquee-item), so nothing jumps when the page loads.
 */
export default function LogoSlider({ logos: cmsLogos = [] }) {
  const logos = cmsLogos.filter((logo) => logo?.url);
  // Enough copies to fill the widest screen on both sides of the loop point.
  const copies = logos.length ? 3 + Math.ceil(5 / logos.length) : 0;

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const motion = useRef({ x: 0, step: 0, setWidth: 0, hovered: false, shift: null });

  // Card spacing and the width of one full set of logos, read from the layout.
  const measure = useCallback(() => {
    const items = trackRef.current?.children;
    const m = motion.current;
    if (!items || items.length <= logos.length) return;
    const step = items[1].offsetLeft - items[0].offsetLeft;
    const setWidth = items[logos.length].offsetLeft - items[0].offsetLeft;
    if (!step || !setWidth) return;
    // Keep the same place in the strip after a resize.
    const progress = m.setWidth ? (m.x - m.setWidth) / m.setWidth : 0;
    m.step = step;
    m.setWidth = setWidth;
    m.x = setWidth + progress * setWidth;
    m.shift = null;
  }, [logos.length]);

  useEffect(() => {
    if (!logos.length) return undefined;
    const m = motion.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    measure();

    const resize = new ResizeObserver(measure);
    if (viewportRef.current) resize.observe(viewportRef.current);

    let frame;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(now - last, 100) / 1000; // no leap after a hidden tab
      last = now;
      if (m.setWidth) {
        if (m.shift) {
          const p = Math.min(1, (now - m.shift.start) / ARROW_SHIFT_MS);
          m.x = m.shift.from + (m.shift.to - m.shift.from) * easeInOut(p);
          if (p === 1) m.shift = null;
        } else if (!m.hovered && !reduceMotion) {
          m.x += SPEED_PX_PER_SECOND * dt;
        }
        // Wrap into the second copy; a running arrow shift moves with it.
        const wrap = m.x >= 2 * m.setWidth ? -m.setWidth : m.x < m.setWidth ? m.setWidth : 0;
        if (wrap) {
          m.x += wrap;
          if (m.shift) {
            m.shift.from += wrap;
            m.shift.to += wrap;
          }
        }
        if (trackRef.current) trackRef.current.style.transform = `translate3d(${-m.x}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [logos.length, measure]);

  // About one card back (-1) or forward (+1), ending on a card edge: the
  // next edge in that direction, or the one after it if the next is less
  // than half a card away. Clicks made during a shift continue from where
  // that shift is heading.
  const shiftBy = (direction) => {
    const m = motion.current;
    if (!m.step) return;
    const base = m.shift ? m.shift.to : m.x;
    const cards = base / m.step;
    let edge = direction > 0 ? Math.floor(cards + 1e-6) + 1 : Math.ceil(cards - 1e-6) - 1;
    if (Math.abs(edge - cards) < 0.5) edge += direction;
    m.shift = { from: m.x, to: edge * m.step, start: performance.now() };
  };

  if (!logos.length) return null;

  return (
    <section className="logo-slider-section">
      <div className="logo-slider-wrap">

        <div
          className="logoSwiper logo-marquee-viewport"
          ref={viewportRef}
          onMouseEnter={() => { motion.current.hovered = true; }}
          onMouseLeave={() => { motion.current.hovered = false; }}
        >
          <div className="logo-marquee-track" ref={trackRef}>
            {Array.from({ length: copies }, (_, copy) =>
              logos.map((logo, index) => (
                <div className="logo-marquee-item" key={`${copy}-${index}`} aria-hidden={copy > 0 || undefined}>
                  <div className="logo-card">
                    <img
                      src={logo.url}
                      alt={copy === 0 ? logo.alt : ""}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PREVIOUS */}
        <button
          type="button"
          className="logo-prev"
          aria-label="Previous logo"
          onClick={() => shiftBy(-1)}
        >
          <i className="fa fa-long-arrow-left"></i>
        </button>

        {/* NEXT */}
        <button
          type="button"
          className="logo-next"
          aria-label="Next logo"
          onClick={() => shiftBy(1)}
        >
          <i className="fa fa-long-arrow-right"></i>
        </button>

      </div>
    </section>
  );
}
