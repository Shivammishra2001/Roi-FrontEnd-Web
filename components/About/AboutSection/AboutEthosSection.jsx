"use client";

import React from "react";
import { useInView } from "@/hooks/useInView";

export default function AboutEthosSection() {
  const [ref, on] = useInView(0.15);

  return (
    <section ref={ref} className="ethos-section-area">
      <div className="srcn-container">
        <div className="sec-head-rule">
          <div className="stats-eyebrow">
            <span className="arr">
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </span>
          Ethos
          </div>
        </div>
        <div className="ethos-section-box">
          <h2 className="ethos-heading">
            We think in ecosystems. <span className="ethos-acc-sub">Not executions.</span>
          </h2>

          <div className="ethos-body-content">
            <p>
              A decision is never one moment. It’s a quiet accumulation — a Reel
              glimpsed at midnight, a Reddit thread read over coffee, an AI answer
              at a desk, a review scanned on the drive home, an ad
              half-remembered from a week ago. By the time your buyer “chooses,”
              they’ve already chosen a hundred times.
            </p>
            <p>
              No single surface earns that choice. The brand woven across all of
              them does.
            </p>
            <p>
              So we don’t build campaigns. We build climates. Architectures of
              presence — organic, paid, AI — breathing in rhythm, lending each
              other weight, slowly rearranging the shape of a decision before
              it’s made.
            </p>
          </div>

          <p className="ethos-close-disp">
            The ad was never the point.
            <br />
            <span className="ethos-acc-sub">The shift in behaviour is.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
