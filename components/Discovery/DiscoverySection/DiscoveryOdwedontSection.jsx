"use client";
import { useInView } from "@/hooks/useInView";

// Strapi `sections.discovery-statement` is authoritative: each line renders
// exactly what is saved. A blank or whitespace-only field renders nothing —
// no hardcoded fallback copy overrides the CMS value.
const filled = (v) => (typeof v === "string" && v.trim() !== "" ? v : null);

export default function DiscoveryOdwedontSection({ intro, heading, description }) {
    const [ref, on] = useInView(0.3);

    const introText = filled(intro);
    const headingText = filled(heading);
    const descriptionText = filled(description);

    return (
        <section
            ref={ref}
            className={`ODWeDont ${on ? "ODWeDont-visible" : ""}`}
        > <div className="srcn-container">
                <div className="ODWeDont-container">
                    {introText && (
                        <p className="ODWeDont-intro ODWeDont-reveal">
                            {introText}
                        </p>
                    )}

                    {headingText && (
                        <p className="ODWeDont-heading ODWeDont-reveal">
                            {headingText}
                        </p>
                    )}

                    {descriptionText && (
                        <p className="ODWeDont-description ODWeDont-reveal">
                            {descriptionText}
                        </p>
                    )}
                </div>
            </div>
        </section>


    );
}
