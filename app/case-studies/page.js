import "../../components/Blog/Section/Blog.css";
import CaseStudieCardSection from "../../components/CaseStudies/Section/CaseStudieCardSection";
import CaseStudieHero from "../../components/CaseStudies/Section/CaseStudieHero";
import CaseStudieNumberSection from '../../components/CaseStudies/Section/CaseStudieNumberSection'
import { getCaseStudies } from "../../lib/strapi";
import { toCaseStudies } from "../../lib/caseStudies";

// Rendered per request so case studies published in Strapi show up immediately.
export const dynamic = "force-dynamic";

export const metadata = { title: "Case Studies | ROI Mantra" };

export default async function CasestudiesPage() {
    const caseStudies = toCaseStudies(await getCaseStudies());

    return (
        <>
            <CaseStudieHero />
            <CaseStudieCardSection caseStudies={caseStudies} />
            <CaseStudieNumberSection />

        </>
    );
}
