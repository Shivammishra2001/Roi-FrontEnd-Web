"use client";

import { useInView } from "@/hooks/useInView";
import { text } from "@/lib/cms";

// Bottom-of-page CTA whose heading reveals word by word (styles: .od-cta in
// style.css). Props are a Strapi `sections.cta-banner`; `defaults` holds the
// built-in copy each page falls back to when a field is blank or missing.
export default function WordRevealCta({ title, description, buttonLabel, buttonHref, defaults = {} }) {
    const [ref, on] = useInView(0.25);

    const words = text(title, defaults.title).split(" ");

    return (
        <section id="cta" ref={ref} className="od-cta">
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
                        {text(description, defaults.description)}
                    </p>
                    <div className="talk-discovery-btn-wrap"><a className="talk-discovery-btn" href={text(buttonHref, defaults.buttonHref)}><span>{text(buttonLabel, defaults.buttonLabel)} </span> <span className="arr"><i className="fa fa-long-arrow-right"></i></span></a></div>

                </div>
            </div>
        </section>
    );
}
