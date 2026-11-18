"use client";

import React from "react";
import Link from "next/link";

const CAREER_ROLES = [
  {
    title: "Business Development Executive — Delhi NCR",
    meta: "Enterprise outbound · pipeline · ₹1 Cr+ ARR deals",
    applyHref: "/contact",
  },
  {
    title: "AI Discovery Strategist — Delhi NCR / Remote",
    meta: "AEO · GEO · entity optimisation · frontier work",
    applyHref: "/contact",
  },
];

export default function AboutCareersSection() {
  return (
    <section className="about-careers-section">
      <div className="srcn-container">
        <div className="about-careers-wrap">
          <div className="about-careers-box">
            <div className="about-careers-lead">
              <div className="about-careers-title">Careers</div>
              <p className="about-careers-desc">
                The work doesn’t stop. The people who want in shouldn’t either.
              </p>
              <Link href="/contact" className="about-careers-all-link">
                See all open roles   <span className="arr-right"><i className="fa fa-long-arrow-right"></i></span>
              </Link>
            </div>

            {CAREER_ROLES.map((role) => (
              <div key={role.title} className="about-careers-role-col">
                <h4>{role.title}</h4>
                <p className="meta">{role.meta}</p>
                <Link href={role.applyHref} className="about-careers-apply-btn">
                  Apply
                  <span className="manifesto-arr"><i className="fa fa-long-arrow-right"></i></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
