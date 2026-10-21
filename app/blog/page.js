import "@/public/styles/Blog.css";
import { getPageBySlug, constructMetadata } from "../../lib/strapi";
import SectionRenderer from "../../components/sections/SectionRenderer";
import { BLOG_SECTIONS } from "../../components/sections/registry/listings";
import { notFound } from "next/navigation";

// Pre-rendered and cached (ISR): re-built at most hourly, and right away
// when Strapi content is saved or published (app/revalidate/route.js).
export const revalidate = 3600;

export async function generateMetadata() {
    const data = await getPageBySlug("blog");
    if (!data) notFound(); // unpublished or "Page Live" switched off
    return constructMetadata(data.seo);
}

export default async function BlogPage() {
    const data = await getPageBySlug("blog");
    if (!data) notFound(); // unpublished or "Page Live" switched off
    return <SectionRenderer sections={data.sections} components={BLOG_SECTIONS} />;
}
