"use client";

import WordRevealCta from "@/components/Cta/WordRevealCta";

const DEFAULTS = {
    title: "Have a number that needs moving?",
    description: "Tell us the metric. We will come back with a plan, not a pitch deck.",
    buttonLabel: "Start a conversation",
    buttonHref: "/contact",
};

// Strapi `sections.cta-banner` (listing pages) or the `cta` of the detail-page settings.
export default function NumberCtaSection(props) {
    return <WordRevealCta {...props} defaults={DEFAULTS} />;
}
