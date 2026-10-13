"use client";
import { useInView } from "@/hooks/useInView";
import { text } from "@/lib/cms";

// Strapi `sections.discovery-statement`; blank fields fall back to the built-in copy.
export default function DiscoveryOdwedontSection({ intro, heading, description }) {
    const [ref, on] = useInView(0.3);
    return (
        <section
            ref={ref}
            className={`ODWeDont ${on ? "ODWeDont-visible" : ""}`}
        > <div className="srcn-container">
                <div className="ODWeDont-container">
                    <p className="ODWeDont-intro ODWeDont-reveal">
                        {text(intro, "Most agencies treat these as separate services. Different teams. Different reports. Different scopes.")} </p>

                    <p className="ODWeDont-heading ODWeDont-reveal">
                        {text(heading, "We don't.")}
                    </p>

                    <p className="ODWeDont-description ODWeDont-reveal">
                        {text(description, "One strategy. One content engine. Every surface fed from the same source. Every output traced back to a business outcome.")}
                    </p>
                </div>
            </div>
        </section>


    );
}
