"use client";

import { useInView } from "@/hooks/useInView";
import { text, list } from "@/lib/cms";
import "@/public/styles/ODShift.css";

const DEFAULT_ITEMS = [
    "A GMB review.",
    "A Reddit thread.",
    "A YouTube Short.",
    "A ChatGPT answer.",
];

// Strapi `sections.discovery-shift`; blank fields fall back to the built-in copy.
export default function ODShift({ eyebrow, heading, headingHighlight, listLabel, listItems, intro }) {
    const [ref, on] = useInView(0.15);

    const OUT = list(listItems, DEFAULT_ITEMS);

    // The highlighted word ("ecosystem.") lives in its own field. The CMS lead
    // line ends at "It's" and omits the article, so render "It's an ecosystem."
    // Appending only when the line ends at "It's" keeps editable copy intact.
    const lead = text(heading, "Organic isn't a channel anymore. It's an").trim();
    const leadLine = /it['’]s$/i.test(lead) ? `${lead} an` : lead;

    return (
        <section
            ref={ref}
            className={`ODShift ${on ? "ODShift-visible" : ""}`}>
            <div className="srcn-container">
                <div className="ODShift-container">
                    <div className="ODShift-grid">
                        {/* Left: eyebrow + stacked headline */}
                        <div className="ODShift-lead">
                            <div className="case-kicker">
                                <span className="arr">
                                    <i
                                        className="fa fa-long-arrow-right"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                                {text(eyebrow, "The Shift")}
                            </div>

                            <h2 className="ODShift-heading">
                                {leadLine}{" "}
                                <span className="ODShift-mark">
                                    {text(headingHighlight, "ecosystem.")}
                                </span>
                            </h2>
                        </div>

                        {/* Right: list + single caption */}
                        <div className="ODShift-content">
                            <div className="ODShift-list-label">
                                {text(listLabel, "A buyer finds you through")}
                            </div>

                            <div className="ODShift-list">
                                {OUT.map((item, index) => (
                                    <div
                                        key={index}
                                        className="ODShift-list-item"
                                        style={{
                                            "--item-index": index,
                                        }}
                                    >
                                        <span className="ODShift-number">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="ODShift-item-text">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <p className="ODShift-caption">
                                {text(intro, "In fragments, across platforms, before they ever type your name.")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
