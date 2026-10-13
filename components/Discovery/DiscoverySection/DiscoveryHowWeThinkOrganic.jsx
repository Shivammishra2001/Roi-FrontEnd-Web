"use client";

import { useEffect } from "react";
import { text, list } from "@/lib/cms";

const DEFAULT_ITEMS = [
  {
    number: "01",
    title: "One asset should earn its keep across ten surfaces.",
    description:
      "Content that lives on one page and one platform is content that's underpriced.",
  },
  {
    number: "02",
    title: "Organic without distribution isn't organic. It's a blog.",
    description:
      "Creation and distribution are the same job. We staff them that way.",
  },
  {
    number: "03",
    title: "Consistency beats intensity. Every time.",
    description:
      "One campaign a quarter loses to one cadence a week. Always.",
  },
  {
    number: "04",
    title: "Rankings are a lagging indicator.",
    description:
      "Pipeline, demand, and category share are what the work is actually for.",
  },
  {
    number: "05",
    title:
      "If the research doesn't connect to a business outcome, the content won't either.",
    description:
      "Every brief we write starts with what the brand is trying to grow.",
    fullWidth: true,
  },
];

// Strapi `sections.discovery-principles`; blank fields fall back to the built-in copy.
// Items reveal one after another, 120ms apart.
export default function DiscoveryHowWeThinkOrganic({ eyebrow, items }) {
  const organicItems = list(items, DEFAULT_ITEMS);

  useEffect(() => {
    const section = document.querySelector(".discovery-about-organic-section");
    const items = document.querySelectorAll(".discovery-about-organic-item");

    if (!section || !items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          items.forEach((item) => {
            const delay = parseInt(item.dataset.delay || "0", 10);

            setTimeout(() => {
              item.classList.add("is-visible");
            }, delay);
          });

          observer.unobserve(section);
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [organicItems.length]);

  return (
    <section
      className="discovery-about-organic-section" id="discovery-about-organic">
      <div className="srcn-container">
        <div className="discovery-about-organic-container">
          <div className=" discovery-how-label case-studies-eyebrow discovery-about-organic-eyebrow"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>{text(eyebrow, "How We Think About Organic")}</div>
          <div className="discovery-about-organic-grid">
            {organicItems.map((item, index) => (
              <div
                key={index}
                className={`discovery-about-organic-item ${item.fullWidth ? "discovery-about-organic-item-full" : ""
                  }`}
                data-delay={index * 120}
              >
                <div className="discovery-about-organic-number">
                  {item.number}
                </div>

                <h3 className="discovery-about-organic-title">
                  {item.title}
                </h3>

                <p className="discovery-about-organic-description">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
