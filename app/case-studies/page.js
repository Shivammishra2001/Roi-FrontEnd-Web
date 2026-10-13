import "@/public/styles/Blog.css";
import CaseStudieCardSection from "../../components/CaseStudies/Section/CaseStudieCardSection";
import CaseStudieHero from "../../components/CaseStudies/Section/CaseStudieHero";
import CaseStudieNumberSection from '../../components/CaseStudies/Section/CaseStudieNumberSection'
import { notFound } from "next/navigation";
import { getCaseStudies, getPageBySlug } from "../../lib/strapi";
import { toCaseStudies } from "../../lib/caseStudies";

// Rendered per request so case studies published in Strapi show up immediately.
export const dynamic = "force-dynamic";

export const metadata = { title: "Case Studies | ROI Mantra" };

export default async function CasestudiesPage() {
    const [page, items] = await Promise.all([getPageBySlug("case-studies"), getCaseStudies()]);
    // Pages -> Case Studies: unpublished or "Page Live" switched off -> 404.
    if (!page) notFound();
    const caseStudies = toCaseStudies(items);

    return (
        <>
            <CaseStudieHero />
            <CaseStudieCardSection caseStudies={caseStudies} />
            <CaseStudieNumberSection />

        </>
    );
}
