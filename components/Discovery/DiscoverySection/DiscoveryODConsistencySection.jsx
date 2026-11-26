"use client";

import { useInView } from "@/hooks/useInView";
import { text, filled } from "@/lib/cms";
import "@/public/styles/ODConsistency.css";

// Strapi `sections.discovery-consistency` — all copy is CMS-driven (no hardcoded
// fallbacks); optional fields are conditionally rendered so blanks leave no gap.
export default function DiscoveryODConsistencySection({ eyebrow, heading, headingHighlight, description, subtitle, tagline, taglineHighlight }) {
  const [ref, on] = useInView(0.2);

  return (
    <section
      ref={ref}
      className={`ODConsistency ${on ? "ODConsistency-visible" : ""}`}
    >
      <div className="srcn-container">
        <div className="ODConsistency-container">
          <div className=" discovery-how-label case-studies-eyebrow"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>{text(eyebrow)}</div>

          <h2 className="ODConsistency-heading">
            {text(heading)}
            {filled(headingHighlight) && (
              <>
                <br />
                <span>{text(headingHighlight)}</span>
              </>
            )}
          </h2>
          <div className="ODConsistency-content">
            {filled(description) && (
              <div className="ODConsistency-content-box">
                <p className="ODConsistency-description">{text(description)}</p>
              </div>
            )}
            <div className="ODConsistency-highlight">
              <div className="ODConsistency-highlight-right">
                {filled(subtitle) && (
                  <p className="ODConsistency-subtitle">{text(subtitle)}</p>
                )}
                {(filled(tagline) || filled(taglineHighlight)) && (
                  <p className="ODConsistency-tagline">
                    {text(tagline)} {filled(taglineHighlight) && <span>{text(taglineHighlight)}</span>}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
