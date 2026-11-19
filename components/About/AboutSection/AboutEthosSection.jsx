"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

// Exact accent of the "Not executions." span (.ethos-acc-sub) + a warm
// highlight, as RGB triples so the gradients can vary alpha freely.
const GOLD = "239, 178, 39"; //  #EFB227
const HILITE = "247, 201, 72"; // #F7C948

/**
 * A procedurally drawn golden silk wave — no video, no pixel-keying, so there
 * are no compression artifacts, no rectangular edge, and the colour is exactly
 * #EFB227 at any resolution. Three soft, blurred sine ribbons drift in and out
 * of phase on a Retina-scaled, fully transparent canvas, so the wave floats
 * straight on the #F4F1EC page background.
 *
 * Motion is a slow, meditative undulation at ~60fps. prefers-reduced-motion
 * paints a single still frame. The canvas is transparent, so nothing but the
 * glow is ever drawn — the page shows through everywhere else.
 */
function EthosWave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap for perf
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // One flowing ribbon: a band between two matching sine edges, filled with a
    // left-to-right glow that fades to nothing at both ends (a light trail).
    const ribbon = (phase, ampMul, thick, alpha, yOff, color) => {
      if (!W || !H) return;
      const steps = 64;
      const midY = H * 0.5 + yOff;
      const A = H * 0.17 * ampMul;
      const A2 = H * 0.06 * ampMul;
      const edge = (u) =>
        midY +
        A * Math.sin(u * Math.PI * 2 + phase) +
        A2 * Math.sin(u * Math.PI * 4 - phase * 1.3);
      const half = (u) => thick * (0.6 + 0.4 * Math.sin(u * Math.PI * 3 + phase * 0.7));

      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const x = u * W;
        const y = edge(u) - half(u);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      for (let i = steps; i >= 0; i--) {
        const u = i / steps;
        ctx.lineTo(u * W, edge(u) + half(u));
      }
      ctx.closePath();

      const g = ctx.createLinearGradient(0, 0, W, 0);
      g.addColorStop(0, `rgba(${color}, 0)`);
      g.addColorStop(0.5, `rgba(${color}, ${alpha})`);
      g.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = g;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // Soft outer haze.
      ctx.filter = "blur(16px)";
      ribbon(t * 0.6, 1.0, H * 0.11, 0.26, 0, GOLD);
      ribbon(t * 0.6 + 2.1, 0.82, H * 0.08, 0.2, H * 0.07, GOLD);
      // Brighter, tighter core.
      ctx.filter = "blur(5px)";
      ribbon(t * 0.6 + 1.0, 0.92, H * 0.035, 0.6, -H * 0.02, HILITE);
      ctx.filter = "none";
    };

    const loop = () => {
      t += 0.006; // slow, meditative drift
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduceMotion) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="ethos-wave-canvas" aria-hidden="true" />;
}

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

  // The default visual is the procedural gold silk wave (no asset). A CMS entry
  // may still override it with a real still image; a video/the old MP4 is
  // ignored — the wave replaces it.
  const imageSrc =
    props?.image?.url ||
    props?.image?.src ||
    (typeof props?.image === "string" ? props.image : null);
  const isImage =
    typeof imageSrc === "string" &&
    !/\.(mp4|webm|mov)$/i.test(imageSrc) &&
    !imageSrc.includes("video");

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

          {/* TWO COLUMN ROW: Left gold silk wave + Right Text */}
          <div className="ethos-middle-grid">
            <div className="ethos-pic-wrap">
              <div className="ethos-pic-inner">
                {isImage ? (
                  <Image
                    src={imageSrc}
                    alt={`${headingMain} ${headingAccent}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    className="ethos-img"
                    priority={false}
                  />
                ) : (
                  <EthosWave />
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
