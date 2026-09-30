"use client";

import { useEffect, useRef, useState } from "react";

export default function TheShift({ eyebrow, heading, shiftRows = [] }) {
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

  const ROWS = shiftRows.map((row) => ({ n: row.number, verb: row.verb }));

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
                    key={`${r.n}-${i}`}
                    className="the-shif-section-row"
                    style={{
                      opacity: shown ? 1 : 0.2,
                      transform: shown ? "translateY(0)" : "translateY(18px)",
                    }}
                  >
                    <span className="the-shif-section-number">{r.n}</span>
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