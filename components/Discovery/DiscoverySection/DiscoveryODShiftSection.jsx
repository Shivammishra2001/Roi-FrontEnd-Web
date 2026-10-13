"use client";

import { useInView } from "@/hooks/useInView";
import { text, list } from "@/lib/cms";
import "@/public/styles/ODShift.css";

const DEFAULT_ITEMS = [
    "A GMB review.",
    "A Reddit thread.",
    "A LinkedIn post.",
    "A YouTube Short.",
    "An article someone else wrote.",
    "A ChatGPT answer that cited your blog.",
];

// Strapi `sections.discovery-shift`; blank fields fall back to the built-in copy.
export default function ODShift({ eyebrow, heading, headingHighlight, listLabel, listItems, intro, paragraph, highlight }) {
    const [ref, on] = useInView(0.15);

    const OUT = list(listItems, DEFAULT_ITEMS);

    return (
        <section
            ref={ref}
            className={`ODShift ${on ? "ODShift-visible" : ""}`}>
            <div className="srcn-container">
                <div className="ODShift-container">
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
                        {text(heading, "Organic isn't a channel anymore. It's")}{" "}
                        <span className="ODShift-mark">
                            {text(headingHighlight, "ecosystem.")}
                        </span>
                    </h2>
                    <div className="ODShift-content">
                        <div className="ODShift-list-column">
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
                        </div>
                        <div className="ODShift-description">
                            <p className="ODShift-intro">
                                {text(intro, "A single YouTube explainer becomes four Reels, two blog articles, a backlink campaign, a Reddit answer, and a GMB post.")}
                            </p>

                            <p className="ODShift-paragraph">
                                {text(paragraph, "Not because volume is the point. Because that's how buyers actually find you now — in fragments, across platforms, before they ever type your name.")}
                            </p>

                            <p className="ODShift-highlight">
                                {text(highlight, "We build the ecosystem that connects it all.")}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>


    );
}
