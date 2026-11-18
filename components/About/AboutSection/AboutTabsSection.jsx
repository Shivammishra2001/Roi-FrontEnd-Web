"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "./aboutData";

export default function AboutTabsSection(props) {
  const [activeTab, setActiveTab] = useState(0);

  const t0 = props?.tabs?.[0];
  const t1 = props?.tabs?.[1];

  const t0Label = t0?.label || "Zero Media Waste.";
  const t1Label = t1?.label || "Partnerships.";

  const t0HeadingBefore = t0?.headingBefore ?? "Built with Google. ";
  const t0HeadingAccent = t0?.headingAccent ?? "Pointed at the leak.";
  const t0HeadingAfter = t0?.headingAfter ?? "";
  const t0LeadBold = t0?.leadBold ?? "Half of most media budgets never reach a buyer.";
  const t0Intro = t0?.intro ?? "The industry has made peace with that. We haven’t.";
  const t0Body = t0?.body ?? "Zero Media Waste is our methodology, built in collaboration with Google. Precise targeting. Relevant messaging. Continuous refinement. Every rupee asked to earn its place — and if it can’t, we move it.";
  const t0BtnLabel = t0?.buttonLabel || "Read more";
  const t0BtnHref = t0?.buttonHref || "/contact";

  const t1HeadingAccent = t1?.headingAccent ?? "Google Premier Partner";
  const t1HeadingAfter = t1?.headingAfter ?? " — one of roughly forty worldwide.";
  const t1Subline = t1?.subline ?? "Meta Business Partner.";
  const t1Chips = t1?.chips?.length
    ? t1.chips
    : [{ text: "Google Premier Partner" }, { text: "Meta Business Partner" }];

  return (
    <section className="about-tabs-section">
      <div className="srcn-container">
        <div className="about-tabs-wrap">
          <div className="about-tabs-tcard">
            {/* TOP: Tab Buttons */}
            <div className="about-tabs-top-header">
              <div className="about-tabs-tabs">
                <button
                  type="button"
                  onClick={() => setActiveTab(0)}
                  className={`about-tabs-tab-btn ${activeTab === 0 ? "active" : ""}`}
                >
                  {t0Label}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab(1)}
                  className={`about-tabs-tab-btn ${activeTab === 1 ? "active" : ""}`}
                >
                  {t1Label}
                </button>
              </div>
            </div>

            {/* BODY: Left Content + Right Image */}
            <div className="about-tabs-body-grid">
              {/* LEFT: Content */}
              <div className="about-tabs-txt" key={activeTab}>
                {activeTab === 0 ? (
                  <>
                    <h3 className="about-tabs-disp">
                      {t0HeadingBefore}
                      <span className="about-tabs-acc">{t0HeadingAccent}</span>
                      {t0HeadingAfter}
                    </h3>
                    <p className="about-tabs-lead">
                      <b>{t0LeadBold}</b> {t0Intro}
                    </p>
                    <p className="about-tabs-desc">
                      {t0Body}
                    </p>
                    <div className="about-tabs-cta-wrap">
                      <Link href={t0BtnHref} className="about-tabs-btn">
                        <span>{t0BtnLabel}</span>
                        <span className="about-tabs-arr">
                          <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </span>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="about-tabs-disp">
                      <span className="about-tabs-acc">{t1HeadingAccent}</span>
                      {t1HeadingAfter}
                    </h3>
                    <p className="about-tabs-sub">
                      {t1Subline}
                    </p>
                    <div className="about-tabs-chips">
                      {t1Chips.map((chip, idx) => (
                        <span key={idx} className="about-tabs-chip">
                          {chip.text || chip}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* RIGHT: Image */}
              <div className="about-tabs-pic">
                <div
                  className="about-tabs-pic-slide"
                  style={{
                    opacity: activeTab === 0 ? 1 : 0,
                    pointerEvents: activeTab === 0 ? "auto" : "none",
                  }}
                >
                  <div className="about-tabs-tab-pic-inner">
                    <Image
                      src={imageUrl(t0?.image, "/images/about/about-zmw-dashboard.jpg")}
                      alt="Zero Media Waste Dashboard"
                      fill
                      sizes="(max-width: 900px) 100vw, 45vw"
                      className="tab-image"
                      priority
                    />
                  </div>
                </div>

                <div
                  className="about-tabs-pic-slide"
                  style={{
                    opacity: activeTab === 1 ? 1 : 0,
                    pointerEvents: activeTab === 1 ? "auto" : "none",
                  }}
                >
                  <div className="about-tabs-tab-pic-inner">
                    <Image
                      src={imageUrl(t1?.image, "/images/about/about-partnerships.jpg")}
                      alt="Google and Meta Premier Partnerships"
                      fill
                      sizes="(max-width: 900px) 100vw, 45vw"
                      className="tab-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
