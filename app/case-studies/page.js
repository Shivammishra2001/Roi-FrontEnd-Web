import "../../components/Blog/Section/Blog.css";
import { getPageBySlug, constructMetadata } from "../../lib/strapi";
import SectionRenderer from "../../components/sections/SectionRenderer";
import { CASE_STUDY_SECTIONS } from "../../components/sections/registry/listings";

// Rendered per request: new/edited case studies published in Strapi appear immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata() {
    const data = await getPageBySlug("case-studies");
    return constructMetadata(data.seo);
}

export default async function CasestudiesPage() {
    const data = await getPageBySlug("case-studies");
    return <SectionRenderer sections={data.sections} components={CASE_STUDY_SECTIONS} />;
}
