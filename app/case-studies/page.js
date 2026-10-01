import "../../components/Blog/Section/Blog.css";
import CaseStudieCardSection from "../../components/CaseStudies/Section/CaseStudieCardSection";
import CaseStudieHero from "../../components/CaseStudies/Section/CaseStudieHero";
import CaseStudieNumberSection from '../../components/CaseStudies/Section/CaseStudieNumberSection'


export default function CasestudiesPage() {
    return (
        <>
            <CaseStudieHero />
            <CaseStudieCardSection />
            <CaseStudieNumberSection />
            
        </>
    );
}