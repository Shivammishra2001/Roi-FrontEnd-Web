"use client";

import { useInView } from "@/hooks/useInView";

export default function DiscoverydctaSection() {
    const [ref, on] = useInView(0.25);

    // Two fixed phrases, each kept on its own line via a block wrapper — no
    // <br> and no stray-space hack (the old "years.     One" spacing created
    // empty word spans and uneven gaps on mobile).
    const lines = [["Twenty-six", "years."], ["One", "obsession."]];
    let wordIndex = 0;

    return (
        <section id="cta" ref={ref} className="od-cta-section-area">
            <div className="srcn-container">
                <div className="od-cta-container">
                    <h2 className="od-cta-title">
                        {lines.map((line, lineIndex) => (
                            <span key={lineIndex} className="od-cta-line">
                                {line.map((word) => {
                                    const index = wordIndex++;
                                    return (
                                        <span key={index} className="od-cta-word-wrapper">
                                            <span
                                                className={`od-cta-word ${on ? "od-cta-word-active" : ""}`}
                                                style={{
                                                    transitionDelay: `${index * 90}ms`,
                                                }}
                                            >
                                                {word}
                                            </span>
                                        </span>
                                    );
                                })}
                            </span>
                        ))}
                    </h2>

                    <p className="od-cta-description">
                       Still asking what the next surface is.
                    </p>
                    <div className="talk-discovery-btn-wrap"><a className="talk-discovery-btn" href="/contact"><span>Start a conversation </span> <span className="arr"><i className="fa fa-long-arrow-right"></i></span></a></div>

                </div>
            </div>
        </section>
    );
}