import { notFound } from 'next/navigation';
import { caseStudies } from "../../../components/CaseStudies/data/caseStudiesData";
import "../../../components/Blog/Section/Blog.css";

import CaseStudyDetailHeroSection from "../CaseStudyDetail/CaseStudyDetailHeroSection";
import MetricsSection from "../CaseStudyDetail/MetricsSection";
import CaseIntroSection from "../CaseStudyDetail/CaseIntroSection";
import CaseObjectivesSection from "../CaseStudyDetail/CaseObjectivesSection";
import ServicesDeployed from "../CaseStudyDetail/ServicesDeployed";
// import CaseImpactSection from "../CaseStudyDetail/CaseImpactSection";
import CaseRelatedSection from "../CaseStudyDetail/CaseRelatedSection";
import CaseNumberSection from "../CaseStudyDetail/CaseNumberSection";
import ResultsSection from "../CaseStudyDetail/ResultsSection"

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const item = caseStudies.find((c) => c.slug === resolvedParams?.slug);
  if (!item) return { title: 'Case Study Not Found | ROI Mantra' };
  return {
    title: `${item.title} | ROI Mantra Case Studies`,
    description: item.summary,
  };
}

export default async function CaseStudyDetailPage({ params }) {
  const resolvedParams = await params;
  const currentCase = caseStudies.find((c) => c.slug === resolvedParams?.slug);

  if (!currentCase) return notFound();

  // Related case studies (excluding current)
  const relatedCases = caseStudies.filter((c) => c.id !== currentCase.id);

  return (
    <main className="case-study-detail-page-wrapper">
      <CaseStudyDetailHeroSection currentCase={currentCase} />
    
      <CaseIntroSection currentCase={currentCase} />
        <MetricsSection currentCase={currentCase} />
        
      <CaseObjectivesSection currentCase={currentCase} />
     
      {/* <CaseImpactSection currentCase={currentCase} /> */}
       <ServicesDeployed currentCase={currentCase} />
        <ResultsSection/>
      <CaseRelatedSection currentCase={currentCase} relatedCases={relatedCases} />
     
      <CaseNumberSection />
    </main>
  );
}
