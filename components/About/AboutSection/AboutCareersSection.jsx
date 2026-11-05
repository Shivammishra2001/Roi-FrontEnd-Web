"use client";

import React from "react";
import Link from "next/link";
import { text, list } from "./aboutData";

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

export default function AboutCareersSection(props) {
  const roles = list(props.roles, CAREER_ROLES);
  return (
    <section className="about-careers-section">
      <div className="srcn-container">
        <div className="about-careers-wrap">
          <div className="about-careers-box">
            <div className="about-careers-lead">
              <div className="about-careers-title">{text(props.title, "Careers")}</div>
              <p className="about-careers-desc">
                {text(props.description, "The work doesn’t stop. The people who want in shouldn’t either.")}
              </p>
              <Link href={text(props.linkHref, "/contact")} className="about-careers-all-link">
                {text(props.linkLabel, "See all open roles")}   <span className="arr-right"><i className="fa fa-long-arrow-right"></i></span>
              </Link>
            </div>

            {roles.map((role, i) => (
              <div key={`${role.title}-${i}`} className="about-careers-role-col">
                <h4>{role.title}</h4>
                <p className="meta">{role.meta}</p>
                <Link href={text(role.applyHref, "/contact")} className="about-careers-apply-btn">
                  {text(role.applyLabel, "Apply")}
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
