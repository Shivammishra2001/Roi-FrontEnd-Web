"use client";

import WordRevealCta from "@/components/Cta/WordRevealCta";

const DEFAULTS = {
    title: "Let's map your organic ecosystem.",
    description: "What's working. What's leaking. Which surfaces you're invisible on. And what one content engine, properly built, could do for the next twelve months.",
    buttonLabel: "Start a conversation",
    buttonHref: "/contact",
};

// Strapi `sections.cta-banner` on the Discovery page.
export default function DiscoverydctaSection(props) {
    return <WordRevealCta {...props} defaults={DEFAULTS} />;
}
