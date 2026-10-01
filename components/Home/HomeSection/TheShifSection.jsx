"use client";

import { useEffect, useRef, useState } from "react";
import { text, list } from "../../../lib/cms";

const DEFAULT_ROWS = [
  { number: "01", verb: "They Google." },
  { number: "02", verb: "Then ask ChatGPT." },
  { number: "03", verb: "Scroll past an ad." },
  { number: "04", verb: "Read a review." },
  { number: "05", verb: "Watch a Reel." },
  { number: "06", verb: "Decide." },
];

export default function TheShift({ data = {} }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / total));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const eyebrow = text(data.eyebrow, "⟶ The Shift");
  const heading = text(data.heading, "Search isn't one box anymore.");
  const ROWS = list(data.shiftRows, DEFAULT_ROWS).filter((r) => r && text(r.verb));

  const rowThresholds = ROWS.map((_, i) => 0.05 + (i / ROWS.length) * 0.7);

  return (
    <section ref={sectionRef} className="pin-section bg-paper">
      <div className="pin-stage">
        <div className="srcn-container">
          <div className="heading">
            <div className="eyebrow Believe-subtitle">
              {eyebrow}
            </div>

            <h2 className="common-top-heading">
              {heading}
            </h2>
          </div>

          <div className="content">
            <div className="the-shif-section-rows">
              {ROWS.map((r, i) => {
                const shown = progress > rowThresholds[i];

                return (
                  <div
                    key={`${r.number}-${i}`}
                    className="the-shif-section-row"
                    style={{
                      opacity: shown ? 1 : 0.2,
                      transform: shown ? "translateY(0)" : "translateY(18px)",
                    }}
                  >
                    <span className="the-shif-section-number">{text(r.number, String(i + 1).padStart(2, "0"))}</span>
                    <span
                      className="the-shif-section-text"
                      style={{
                        color: shown ? "#1A1A1A" : "#9e9e9e",
                      }}
                    >
                      {r.verb}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
