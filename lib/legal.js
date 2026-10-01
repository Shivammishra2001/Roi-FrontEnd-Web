// Strapi legal page (privacy-policy / terms-and-condition single type) merged
// over the built-in copy, field by field: a missing, blank or unreachable
// CMS value renders the original text instead of an empty page.
import { text, list } from './cms';

export function mergeLegalPage(cms, fallback) {
    const data = cms && typeof cms === 'object' ? cms : {};
    const help = data.helpCard || {};
    const fbHelp = fallback.helpCard;

    // A section is usable when it has an anchor, a table-of-contents title, a heading and a body.
    const sections = list(data.sections)
        .filter((s) => s && text(s.anchorId) && text(s.navTitle) && text(s.heading) && list(s.content).length)
        .map((s) => ({ ...s, calloutStyle: s.calloutStyle === 'outlined' ? 'outlined' : 'filled' }));

    return {
        title: text(data.title, fallback.title),
        badge: text(data.badge, fallback.badge),
        heroDescription: text(data.heroDescription, fallback.heroDescription),
        effectiveDate: text(data.effectiveDate, fallback.effectiveDate),
        lastUpdated: text(data.lastUpdated, fallback.lastUpdated),
        helpCard: {
            title: text(help.title, fbHelp.title),
            text: text(help.text, fbHelp.text),
            email: text(help.email, fbHelp.email),
            phone: text(help.phone, fbHelp.phone),
            buttonLabel: text(help.buttonLabel, fbHelp.buttonLabel),
            buttonHref: text(help.buttonHref, fbHelp.buttonHref),
        },
        sections: sections.length ? sections : fallback.sections,
        seo: {
            metaTitle: text(data.seo?.metaTitle, fallback.seo.metaTitle),
            metaDescription: text(data.seo?.metaDescription, fallback.seo.metaDescription),
            ogImage: data.seo?.ogImage ?? null,
        },
    };
}

// Next.js metadata from the merged page.
export function legalMetadata(page) {
    const { metaTitle: title, metaDescription: description, ogImage } = page.seo;
    const imageUrl = ogImage?.file?.url || ogImage?.url;
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            ...(imageUrl ? { images: [{ url: imageUrl, alt: ogImage.alt || title }] } : {}),
        },
    };
}
