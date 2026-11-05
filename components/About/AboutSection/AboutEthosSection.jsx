"use client";

import React from "react";
import { useInView } from "@/hooks/useInView";
import { text, list } from "./aboutData";

const DEFAULT_PARAGRAPHS = [
  "A decision is never one moment. It’s a quiet accumulation — a Reel glimpsed at midnight, a Reddit thread read over coffee, an AI answer at a desk, a review scanned on the drive home, an ad half-remembered from a week ago. By the time your buyer “chooses,” they’ve already chosen a hundred times.",
  "No single surface earns that choice. The brand woven across all of them does.",
  "So we don’t build campaigns. We build climates. Architectures of presence — organic, paid, AI — breathing in rhythm, lending each other weight, slowly rearranging the shape of a decision before it’s made.",
];

export default function AboutEthosSection(props) {
  const paragraphs = list(props.paragraphs, DEFAULT_PARAGRAPHS);
  const [ref, on] = useInView(0.15);

  return (
    <section ref={ref} className="ethos-section-area">
      <div className="srcn-container">
        <div className="sec-head-rule">
          <div className="stats-eyebrow">
            <span className="arr">
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </span>
          {text(props.eyebrow, "Ethos")}
          </div>
        </div>
        <div className="ethos-section-box">
          <h2 className="ethos-heading">
            {text(props.headingMain, "We think in ecosystems.")} <span className="ethos-acc-sub">{text(props.headingAccent, "Not executions.")}</span>
          </h2>

          <div className="ethos-body-content">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <p className="ethos-close-disp">
            {text(props.closeMain, "The ad was never the point.")}
            <br />
            <span className="ethos-acc-sub">{text(props.closeAccent, "The shift in behaviour is.")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
