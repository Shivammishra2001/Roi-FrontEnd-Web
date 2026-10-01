// Strapi case study -> the shape the redesigned case-study components read
// (the shape of the old components/CaseStudies/data/caseStudiesData.js).
//
// Works for both payloads: the raw core REST list (GET /api/case-studies,
// media as { alt, file: { url } }, lists as [{ text }]) and the flattened
// detail (GET /api/case-studies/slug/:slug, media as { url, alt }, lists as
// strings). Every field has a safe default, and only the redesign's fields
// are passed on: older fields still stored in Strapi (industry, services,
// achievements, …) would otherwise switch on legacy blocks in the components.

const str = (value, fallback = '') => (typeof value === 'string' && value.trim() ? value : fallback);
const list = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);
const texts = (value) =>
    list(value)
        .map((item) => (typeof item === 'string' ? item : item?.text))
        .filter((text) => typeof text === 'string' && text.trim());
const mediaUrl = (media) => str(media?.url) || str(media?.file?.url);

export function toCaseStudy(raw) {
    if (!raw || typeof raw !== 'object' || !str(raw.slug)) return null;

    const title = str(raw.title);
    const image = mediaUrl(raw.image);

    const item = {
        id: raw.documentId || raw.id || raw.slug,
        slug: raw.slug,
        title,
        subtitle: str(raw.subtitle),
        category: str(raw.category, 'other'),
        sector: str(raw.sector),
        client: str(raw.client),
        image,
        heroImage: mediaUrl(raw.heroImage) || image,
        alt: str(raw.image?.alt, title),
        cardTitle: str(raw.cardTitle, str(raw.client, title)),
        cardSubtitle: str(raw.cardSubtitle),
        cardCategory: str(raw.cardCategory),
        cardMetrics: list(raw.cardMetrics)
            .filter((m) => str(m.value))
            .map((m) => ({ value: m.value, label: str(m.label) })),
        challengeKicker: str(raw.challengeKicker),
        challengeTitle: str(raw.challengeTitle),
        challengeParagraphs: texts(raw.challengeParagraphs),
        solutionLabel: str(raw.solutionLabel),
        solutionTitle: str(raw.solutionTitle),
        solutionParagraphs: texts(raw.solutionParagraphs),
        strategicObjectives: texts(raw.strategicObjectives),
        obstacles: texts(raw.obstacles),
        impactMetrics: list(raw.impactMetrics)
            .filter((m) => str(m.label))
            .map((m) => ({
                label: m.label,
                value: str(m.value),
                ...(str(m.description) ? { description: m.description } : {}),
            })),
        servicesHeading: str(raw.servicesHeading),
        servicesList: texts(raw.servicesList),
        slides: list(raw.slides)
            .map((slide) => ({ image: mediaUrl(slide), alt: str(slide.alt, title) }))
            .filter((slide) => slide.image),
    };

    return item;
}

export function toCaseStudies(rawList) {
    return list(rawList).map(toCaseStudy).filter(Boolean);
}

// Plain-text description for <meta>: the list-card text, else the subtitle,
// else the first challenge paragraph (trimmed to ~160 characters).
export function caseStudyDescription(item) {
    const text = item.cardSubtitle || item.challengeParagraphs[0] || item.subtitle || '';
    return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;
}
