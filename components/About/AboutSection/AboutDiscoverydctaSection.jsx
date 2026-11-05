"use client";

import { useInView } from "@/hooks/useInView";

export default function DiscoverydctaSection() {
    const [ref, on] = useInView(0.25);

    const words = "Twenty-six years. One obsession.".split(" ");

    return (
        <section id="cta" ref={ref} className="od-cta-section-area">
            <div className="srcn-container">
                <div className="od-cta-container">
                    <h2 className="od-cta-title">
                        {words.map((word, index) => (
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