"use client";

import { useInView } from "@/hooks/useInView";
import { text } from "@/lib/cms";

// Strapi `sections.discovery-ai`; blank fields fall back to the built-in copy.
export default function DiscoveryODAISection({ eyebrow, heading, headingHighlight, body, secondaryText, button }) {
    const [ref, on] = useInView(0.2);

    return (
        <section
            ref={ref}
            className={`odai-section ${on ? "odai-visible" : ""}`}
        >
            <div className="srcn-container">
                <div className="odai-container">
                    <div className="odai-heading">
                        <div className="case-kicker discovery-how-label"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>{text(eyebrow, "Organic in the Age of AI")}</div>

                        <h2 className="odai-title">
                            {text(heading, "AI didn't kill organic.")}
                            <span className="odai-highlight">
                                {" "}{text(headingHighlight, "It raised the bar.")}
                            </span>
                        </h2>
                    </div>
                    <div className="odai-content">
                        <div className="odai-content-box">
                            <p>
                                {text(body, "ChatGPT, Perplexity, and AI Overviews pull from the same web the rest of organic lives on. If you're not findable, cited, and credible there, you're invisible in AI too.")}
                            </p>

                            <p className="odai-secondary-text">
                                {text(secondaryText, "Organic Discovery and AI Discovery share a spine. We build both as one practice.")}
                            </p>
                            <div className="header__btn-groups discovery-row ">
                                <a
                                    href={text(button?.href, "#discovery-how")}
                                    className="discovery-row-btn dark work-buttons"
                                    {...(button?.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                >
                                    {text(button?.label, "Read: AI Discovery")} <span className="arr"><i className="fa fa-long-arrow-right"></i></span>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
