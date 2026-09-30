import { notFound } from 'next/navigation';
import { getCaseStudy, getCaseStudyDetailSettings } from "../../../lib/strapi";
import "../../../components/Blog/Section/Blog.css";

import CaseStudyDetailHeroSection from "../CaseStudyDetail/CaseStudyDetailHeroSection";
import MetricsSection from "../CaseStudyDetail/MetricsSection";
import CaseIntroSection from "../CaseStudyDetail/CaseIntroSection";
import CaseObjectivesSection from "../CaseStudyDetail/CaseObjectivesSection";
import ServicesDeployed from "../CaseStudyDetail/ServicesDeployed";
import CaseRelatedSection from "../CaseStudyDetail/CaseRelatedSection";
import CaseNumberSection from "../CaseStudyDetail/CaseNumberSection";
import ResultsSection from "../CaseStudyDetail/ResultsSection";

// Any published case study resolves on request — no rebuild needed for new slugs.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [detail, settings] = await Promise.all([getCaseStudy(slug), getCaseStudyDetailSettings()]);
  if (!detail) return { title: settings.notFoundTitle };

  const { caseStudy } = detail;
  return {
    title: caseStudy.seo?.metaTitle || `${caseStudy.title}${settings.metaTitleSuffix || ''}`,
    description: caseStudy.seo?.metaDescription || caseStudy.summary,
  };
}

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;
  const [detail, settings] = await Promise.all([getCaseStudy(slug), getCaseStudyDetailSettings()]);

  if (!detail) return notFound();

  const { caseStudy: currentCase, related: relatedCases } = detail;

  return (
    <main className="case-study-detail-page-wrapper">
      <CaseStudyDetailHeroSection currentCase={currentCase} backgroundVideo={settings.backgroundVideo} />

      <CaseIntroSection
        currentCase={currentCase}
        clientLabel={settings.clientLabel}
        industryLabel={settings.industryLabel}
        servicesLabel={settings.servicesLabel}
        durationLabel={settings.durationLabel}
      />
        <MetricsSection currentCase={currentCase} />

      <CaseObjectivesSection
        currentCase={currentCase}
        objectivesLabel={settings.objectivesLabel}
        objectivesTitle={settings.objectivesTitle}
        challengesLabel={settings.challengesLabel}
        challengesTitle={settings.challengesTitle}
      />

       <ServicesDeployed currentCase={currentCase} label={settings.servicesDeployedLabel} title={settings.servicesDeployedTitle} />
        <ResultsSection kicker={settings.resultsKicker} title={settings.resultsTitle} results={currentCase.results} />
      <CaseRelatedSection
        relatedCases={relatedCases}
        kicker={settings.relatedKicker}
        title={settings.relatedTitle}
        buttonLabel={settings.relatedButtonLabel}
      />

      {settings.cta && <CaseNumberSection {...settings.cta} />}
    </main>
  );
}
