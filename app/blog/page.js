import "@/public/styles/Blog.css";
import { getPageBySlug, constructMetadata } from "../../lib/strapi";
import SectionRenderer from "../../components/sections/SectionRenderer";
import { BLOG_SECTIONS } from "../../components/sections/registry/listings";
import { notFound } from "next/navigation";

// Rendered per request: new/edited posts published in Strapi appear immediately.
export const dynamic = "force-dynamic";

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
