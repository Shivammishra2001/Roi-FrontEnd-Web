import { notFound } from 'next/navigation';
import "../../../components/Blog/Section/Blog.css";

import CaseStudyDetailHeroSection from "../CaseStudyDetail/CaseStudyDetailHeroSection";
// import MetricsSection from "../CaseStudyDetail/MetricsSection";
import CaseIntroSection from "../CaseStudyDetail/CaseIntroSection";
import CaseObjectivesSection from "../CaseStudyDetail/CaseObjectivesSection";
import ServicesDeployed from "../CaseStudyDetail/ServicesDeployed";
import CaseImpactSection from "../CaseStudyDetail/CaseImpactSection";
// import CaseRelatedSection from "../CaseStudyDetail/CaseRelatedSection";
import CaseNumberSection from "../CaseStudyDetail/CaseNumberSection";
// import ResultsSection from "../CaseStudyDetail/ResultsSection"
import { getCaseStudy, constructMetadata } from "../../../lib/strapi";
import { toCaseStudy, caseStudyDescription } from "../../../lib/caseStudies";

// Rendered per request so edits published in Strapi show up immediately.
export const dynamic = 'force-dynamic';

// Open Graph needs absolute image URLs; Strapi media are root-relative.
const SITE_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || '').replace(/\/$/, '');
const absolute = (url) => (url && url.startsWith('/') && SITE_URL ? `${SITE_URL}${url}` : url);

async function loadCaseStudy(params) {
  const { slug } = await params;
  const detail = await getCaseStudy(slug);
  return { item: toCaseStudy(detail?.caseStudy), seo: detail?.caseStudy?.seo ?? null };
}

export async function generateMetadata({ params }) {
  const { item, seo } = await loadCaseStudy(params);
  if (!item) return { title: 'Case Study Not Found | ROI Mantra' };

  const title = `${item.title} | ROI Mantra Case Studies`;
  const description = caseStudyDescription(item);
  const image = absolute(item.heroImage || item.image);
  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      ...(image ? { images: [{ url: image, alt: item.alt }] } : {}),
    },
    // A filled-in SEO component in Strapi overrides the generated values.
    ...constructMetadata(seo),
  };
}

export default async function CaseStudyDetailPage({ params }) {
  const { item: currentCase } = await loadCaseStudy(params);
  if (!currentCase) return notFound();
  return (
    <main className="case-study-detail-page-wrapper">
      <CaseStudyDetailHeroSection currentCase={currentCase} />
    
      <CaseIntroSection currentCase={currentCase} />
        {/* <MetricsSection currentCase={currentCase} /> */}
      
      <CaseObjectivesSection currentCase={currentCase} />
     
      <CaseImpactSection currentCase={currentCase} />
       <ServicesDeployed currentCase={currentCase} />
        {/* <ResultsSection/> */}
      {/* <CaseRelatedSection currentCase={currentCase} relatedCases={relatedCases} /> */}
     
      <CaseNumberSection />
    </main>
  );
}
