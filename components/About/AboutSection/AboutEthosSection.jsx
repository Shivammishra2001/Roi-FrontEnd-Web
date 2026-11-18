"use client";

import React from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export default function AboutEthosSection(props) {
  const [ref, on] = useInView(0.15);

  const eyebrow = props?.eyebrow || "Ethos";
  const headingMain = props?.headingMain || "We think in ecosystems.";
  const headingAccent = props?.headingAccent || "Not executions.";

  const paragraphs = props?.paragraphs?.length
    ? props.paragraphs.map((p) => (typeof p === "string" ? p : p?.text || ""))
    : [
        "A decision is never one moment. It’s a quiet accumulation — a Reel glimpsed at midnight, a Reddit thread read over coffee, an AI answer at a desk, a review scanned on the drive home, an ad half-remembered from a week ago. By the time your buyer “chooses,” they’ve already chosen a hundred times.",
        "No single surface earns that choice. The brand woven across all of them does.",
        "So we don’t build campaigns. We build climates. Architectures of presence — organic, paid, AI — breathing in rhythm, lending each other weight, slowly rearranging the shape of a decision before it’s made.",
      ];

  const closeMain = props?.closeMain || "The ad was never the point.";
  const closeAccent = props?.closeAccent || "The shift in behaviour is.";

  const mediaSrc =
    props?.video ||
    props?.videoSrc ||
    props?.image?.url ||
    props?.image?.src ||
    (typeof props?.image === "string" ? props.image : null) ||
    "/images/about/about-video.mp4";

  const isVideo =
    typeof mediaSrc === "string" &&
    (mediaSrc.endsWith(".mp4") ||
      mediaSrc.endsWith(".webm") ||
      mediaSrc.endsWith(".mov") ||
      mediaSrc.includes("video"));

  return (
    <section ref={ref} className="ethos-section-area">
      <div className="srcn-container">
        <div className="sec-head-rule">
          <div className="stats-eyebrow">
            <span className="arr">
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </span>
            {eyebrow}
          </div>
        </div>

        <div className="ethos-section-box">
          <h2 className="ethos-heading">
            {headingMain} <span className="ethos-acc-sub">{headingAccent}</span>
          </h2>

          {/* TWO COLUMN ROW: Left Video (filling the gap) + Right Text */}
          <div className="ethos-middle-grid">
            <div className="ethos-pic-wrap">
              <div className="ethos-pic-inner">
                {isVideo ? (
                  <video
                    src={mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="ethos-video-media"
                  />
                ) : (
                  <Image
                    src={mediaSrc}
                    alt={`${headingMain} ${headingAccent}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    className="ethos-img"
                    priority={false}
                  />
                )}
              </div>
            </div>

            <div className="ethos-body-content">
              {paragraphs.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>
          </div>

          <p className="ethos-close-disp">
            {closeMain}
            <br />
            <span className="ethos-acc-sub">{closeAccent}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
