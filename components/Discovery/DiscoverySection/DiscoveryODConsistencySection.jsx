"use client";

import { useInView } from "@/hooks/useInView";
import { text } from "@/lib/cms";
import "@/public/styles/ODConsistency.css";

// Strapi `sections.discovery-consistency`; blank fields fall back to the built-in copy.
export default function DiscoveryODConsistencySection({ eyebrow, heading, headingHighlight, description, subtitle, tagline, taglineHighlight }) {
  const [ref, on] = useInView(0.2);

  return (
    <section
      ref={ref}
      className={`ODConsistency ${on ? "ODConsistency-visible" : ""}`}
    >
      <div className="srcn-container">
        <div className="ODConsistency-container">
          <div className=" discovery-how-label case-studies-eyebrow"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>{text(eyebrow, "Consistency is the Compounding Asset")}</div>

          <h2 className="ODConsistency-heading">
            {text(heading, "Organic doesn't reward the brand that shows up loudest.")}{" "}
            <span>
              {text(headingHighlight, "It rewards the one that shows up every week, on every surface, for years.")}
            </span>
          </h2>
          <div className="ODConsistency-content">
            <div className="ODConsistency-content-box">
              <p className="ODConsistency-description">
                {text(description, "One video a quarter won't move anything. One video a week, chopped into fifteen outputs across six surfaces, becomes a category position.")}
              </p>
            </div>
            <div className="ODConsistency-highlight">
              <div className="ODConsistency-highlight-right">
                <p className="ODConsistency-subtitle">
                  {text(subtitle, "That's the work.")}
                </p>
                <p className="ODConsistency-tagline">
                  {text(tagline, "Not campaigns.")} <span>{text(taglineHighlight, "Cadence.")}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
