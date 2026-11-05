"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { text, list, imageUrl } from "./aboutData";

const DEFAULT_TABS = [
  {
    label: "Zero Media Waste.",
    headingBefore: "Built with Google. ",
    headingAccent: "Pointed at the leak.",
    headingAfter: "",
    leadBold: "Half of most media budgets never reach a buyer.",
    intro: "The industry has made peace with that. We haven’t.",
    body:
      "Zero Media Waste is our methodology, built in collaboration with Google. Precise targeting. Relevant messaging. Continuous refinement. Every rupee asked to earn its place — and if it can’t, we move it.",
    buttonLabel: "Read more",
    buttonHref: "/contact",
    image: "/images/about/about-zmw-dashboard.jpg",
    imageAlt: "Zero Media Waste Dashboard",
  },
  {
    label: "Partnerships.",
    headingBefore: "",
    headingAccent: "Google Premier Partner",
    headingAfter: " — one of roughly forty worldwide.",
    subline: "Meta Business Partner.",
    chips: ["Google Premier Partner", "Meta Business Partner"],
    image: "/images/about/about-partnerships.jpg",
    imageAlt: "Google and Meta Premier Partnerships",
  },
];

const str = (v) => (typeof v === "string" ? v : "");

export default function AboutTabsSection(props) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = list(props.tabs, DEFAULT_TABS).map((tab, i) => {
    const fallback = DEFAULT_TABS[i] || {};
    return {
      ...tab,
      label: text(tab.label, fallback.label || `Tab ${i + 1}`),
      src: imageUrl(tab.image, fallback.image || ""),
      alt: text(tab.image && tab.image.alt, fallback.imageAlt || text(tab.label, "")),
    };
  });
  const current = tabs[Math.min(activeTab, tabs.length - 1)];
  const paragraphs = str(current.body).split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);
  const chips = list(current.chips, []);

  return (
    <section className="about-tabs-section">
      <div className="srcn-container">
        <div className="about-tabs-wrap">
          <div className="about-tabs-tcard">
            <div className="about-tabs-tabs">
              {tabs.map((tab, i) => (
                <button
                  key={`${tab.label}-${i}`}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  style={{
                    color: activeTab === i ? "var(--ink, #1A1A1A)" : "var(--tab-off, #B5B0A8)",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="about-tabs-txt" key={activeTab}>
              <h3 className="about-tabs-disp">
                {str(current.headingBefore)}
                <span className="about-tabs-acc">{str(current.headingAccent)}</span>
                {str(current.headingAfter)}
              </h3>
              {(text(current.leadBold) || text(current.intro)) && (
                <p>
                  {text(current.leadBold) && (
                    <b style={{ color: "var(--ink, #1A1A1A)" }}>{current.leadBold}</b>
                  )}
                  {text(current.leadBold) && text(current.intro) ? " " : ""}
                  {str(current.intro)}
                </p>
              )}
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {text(current.subline) && (
                <p style={{ color: "var(--ink, #1A1A1A)", fontSize: "22px", fontWeight: 500 }}>
                  {current.subline}
                </p>
              )}
              {chips.length > 0 && (
                <div className="about-tabs-chips">
                  {chips.map((chip, i) => (
                    <span className="about-tabs-chip" key={i}>
                      {chip}
                    </span>
                  ))}
                </div>
              )}
              {text(current.buttonLabel) && (
                <div>
                  <Link href={text(current.buttonHref, "/contact")} className="about-tabs-btn">
                    {current.buttonLabel}{" "}
                    <span className="about-tabs-arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>
                  </Link>
                </div>
              )}
            </div>
            <div className="about-tabs-pic">
              {tabs.map((tab, i) => (
                <div
                  key={`${tab.label}-pic-${i}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: activeTab === i ? 1 : 0,
                    transition: "opacity .5s ease",
                    pointerEvents: activeTab === i ? "auto" : "none",
                  }}
                >
                  <div className="about-tabs-tab-pic-inner">
                    {tab.src && (
                      <Image
                        src={tab.src}
                        alt={tab.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 35vw"
                        className="tab-image"
                        priority={i === 0}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
