
"use client";

import { useEffect } from "react";
import { text, list } from "@/lib/cms";

const DEFAULT_SURFACES = [
  {
    number: "01",
    title: "Search engines",
    tags: ["SEO", "Local SEO", "eCommerce SEO", "Mobile SEO"],
  },
  {
    number: "02",
    title: "Video platforms",
    tags: ["YouTube SEO", "Shorts", "Reels distribution"],
  },
  {
    number: "03",
    title: "Communities",
    tags: ["Reddit", "Quora", "niche forums"],
  },
  {
    number: "04",
    title: "Earned media",
    tags: ["Digital PR", "backlinks", "guest contributions"],
  },
  {
    number: "05",
    title: "Knowledge layer",
    tags: ["Wikipedia", "entity presence", "structured data"],
  },
  {
    number: "06",
    title: "Local & reputation",
    tags: ["GMB", "review ecosystems", "map pack"],
  },
  {
    number: "07",
    title: "Owned social (organic)",
    tags: ["LinkedIn", "Instagram", "X"],
  },
];

// Strapi `sections.discovery-surfaces`; blank fields fall back to the built-in copy.
export default function Surfaces({ eyebrow, heading, surfaces: cmsSurfaces, footerText, footerHighlight }) {
  const surfaces = list(cmsSurfaces, DEFAULT_SURFACES);

  useEffect(() => {
    const section = document.querySelector("#od-surfaces");
    const heading = document.querySelector(".od-surfaces-heading");
    const rows = document.querySelectorAll(".od-surfaces-row");
    const footer = document.querySelector(".od-surfaces-footer");

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (heading) {
      observer.observe(heading);
    }

    rows.forEach((row, index) => {
      row.style.transitionDelay = `${index * 70}ms`;
      observer.observe(row);
    });

    if (footer) {
      observer.observe(footer);
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Animation reset intentionally disabled.
            // Uncomment if animation should replay every time.

            /*
            heading?.classList.remove("is-visible");

            rows.forEach((row) => {
              row.classList.remove("is-visible");
            });

            footer?.classList.remove("is-visible");
            */
          }
        });
      },
      {
        threshold: 0,
      }
    );

    sectionObserver.observe(section);

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, [surfaces.length]);

  return (
    <>
      <section
        className="od-surfaces-section"
        id="od-surfaces"
      >
        <div className="srcn-container">
        <div className="od-surfaces-container">
           <div className=" discovery-how-label"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span> {text(eyebrow, "The Surfaces")}</div>
          <h2 className="od-surfaces-heading">
            {text(heading, "Where organic discovery actually happens.")}
          </h2>
          <div className="od-surfaces-list">

            {surfaces.map((surface, index) => (
              <div
                className="od-surfaces-row"
                key={index}
              >
                <span className="od-surfaces-number">
                  {surface.number}
                </span>
                <a
                  href={text(surface.href, "#")}
                  className="od-surfaces-title"
                >
                  {surface.title}
                </a>

                <div className="od-surfaces-tags">
                  {(surface.tags || []).map((tag) => (
                    <a
                      href={text(surface.href, "#")}
                      className="od-surfaces-tag"
                      key={tag}
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            ))}

          </div>
          <p className="od-surfaces-footer">
            {text(footerText, "Each one looks like a separate playbook.")}{" "}
            <span className="od-surfaces-highlight">
              {text(footerHighlight, "We run them as one.")}
            </span>
          </p>
        </div>
        </div>
      </section>
    </>
  );
}
