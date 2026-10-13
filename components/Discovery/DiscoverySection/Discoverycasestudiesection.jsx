
"use client";

import { useEffect, useRef } from "react";
import { text, list } from "@/lib/cms";


const DEFAULT_CARDS = [
    {
        category: "Healthcare",
        number: "01",
        title: "Max Healthcare",
        description:
            "Built a condition-led content engine feeding SEO, YouTube, and GMB across 20+ specialties.",
        href: "#",
    },
    {
        category: "Travel",
        number: "02",
        title: "Ease My Trip",
        description:
            "Scaled destination content across articles, Shorts, and Reddit into a compounding discovery flywheel.",
        href: "#",
    },
    {
        category: "Hospitality",
        number: "03",
        title: "Sarovar Hotels",
        description:
            "Property-level SEO, local presence, and reputation layered into one organic programme across 100+ hotels.",
        href: "#",
    },

];

// Strapi `sections.discovery-work`; blank fields fall back to the built-in copy.
export default function CaseStudiesPage({ eyebrow, heading, buttonLabel, buttonHref, cards }) {
    const sectionRef = useRef(null);
    const caseStudies = list(cards, DEFAULT_CARDS);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const elements = section.querySelectorAll(
            ".case-studies-heading, .case-studies-card"
        );

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) =>
                element.classList.add("is-visible")
            );
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
            }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [caseStudies.length]);

    return (


        <section
            id="case-studies"
            className="case-studies-section"
            ref={sectionRef}
        >
            <div className="srcn-container">
                <div className="case-studies-container">
                    <div className="case-studies-header">
                        <div className="case-studies-heading-wrap">
                            <div className=" discovery-how-label case-studies-eyebrow"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>  {text(eyebrow, "The Work")}</div>

                            <h2 className="case-studies-heading ">
                                {heading ? heading : (
                                    <>
                                        Brands we&apos;ve built
                                        <br className="desktop-break" /> organic
                                        ecosystems for.
                                    </>
                                )}
                            </h2>
                        </div>
                        <div className="blog-contnet-btn-area"><a className="work-button" href={text(buttonHref, "/case-studies")}><span>{text(buttonLabel, "See all case studies")}</span><span className="button-arrow"><i className="fa fa-long-arrow-right"></i></span></a></div>

                    </div>

                    <div className="case-studies-grid">
                        {caseStudies.map((study, index) => (
                            <a
                                href={text(study.href, "#")}
                                className="case-studies-card"
                                key={index}
                                style={{
                                    transitionDelay: `${index * 120}ms`,
                                }}
                                aria-label={`Read the ${study.title} case study`}
                            >
                                <div className="case-studies-card-top">
                                    <span>{study.category}</span>

                                    <span className="case-studies-card-number">
                                        {study.number}
                                    </span>
                                </div>

                                <div className="case-studies-card-content">
                                    <h3 className="case-studies-card-title">
                                        {study.title}
                                    </h3>

                                    <p className="case-studies-card-description">
                                        {study.description}
                                    </p>

                                    <span
                                        className="case-studies-card-arrow"
                                        aria-hidden="true"
                                    >
                                     <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
