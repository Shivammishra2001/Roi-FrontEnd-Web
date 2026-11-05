"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutTabsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="about-tabs-section">
      <div className="srcn-container">
        <div className="about-tabs-wrap">
          <div className="about-tabs-tcard">
            <div className="about-tabs-tabs">
              <button
                type="button"
                onClick={() => setActiveTab(0)}
                style={{
                  color: activeTab === 0 ? "var(--ink, #1A1A1A)" : "var(--tab-off, #B5B0A8)",
                }}
              >
                Zero Media Waste.
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(1)}
                style={{
                  color: activeTab === 1 ? "var(--ink, #1A1A1A)" : "var(--tab-off, #B5B0A8)",
                }}
              >
                Partnerships.
              </button>
            </div>
            <div className="about-tabs-txt" key={activeTab}>
              {activeTab === 0 ? (
                <>
                  <h3 className="about-tabs-disp">
                    Built with Google. <span className="about-tabs-acc">Pointed at the leak.</span>
                  </h3>
                  <p>
                    <b style={{ color: "var(--ink, #1A1A1A)" }}>
                      Half of most media budgets never reach a buyer.
                    </b>{" "}
                    The industry has made peace with that. We haven’t.
                  </p>
                  <p>
                    Zero Media Waste is our methodology, built in collaboration with
                    Google. Precise targeting. Relevant messaging. Continuous
                    refinement. Every rupee asked to earn its place — and if it
                    can’t, we move it.
                  </p>
                  <div>
                    <Link href="/contact" className="about-tabs-btn">
                      Read more 
                      <span className="about-tabs-arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="about-tabs-disp">
                    <span className="about-tabs-acc">Google Premier Partner</span> — one of roughly forty worldwide.
                  </h3>
                  <p style={{ color: "var(--ink, #1A1A1A)", fontSize: "22px", fontWeight: 500 }}>
                    Meta Business Partner.
                  </p>
                  <div className="about-tabs-chips">
                    <span className="about-tabs-chip">Google Premier Partner</span>
                    <span className="about-tabs-chip">Meta Business Partner</span>
                  </div>
                </>
              )}
            </div>
            <div className="about-tabs-pic">
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: activeTab === 0 ? 1 : 0,
                  transition: "opacity .5s ease",
                  pointerEvents: activeTab === 0 ? "auto" : "none",
                }}
              >
                <div className="about-tabs-tab-pic-inner">
                  <Image
                    src="/images/about/about-zmw-dashboard.jpg"
                    alt="Zero Media Waste Dashboard"
                    fill
                    sizes="(max-width: 900px) 100vw, 35vw"
                    className="tab-image"
                    priority
                  />
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: activeTab === 1 ? 1 : 0,
                  transition: "opacity .5s ease",
                  pointerEvents: activeTab === 1 ? "auto" : "none",
                }}
              >
                <div className="about-tabs-tab-pic-inner">
                  <Image
                    src="/images/about/about-partnerships.jpg"
                    alt="Google and Meta Premier Partnerships"
                    fill
                    sizes="(max-width: 900px) 100vw, 35vw"
                    className="tab-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
