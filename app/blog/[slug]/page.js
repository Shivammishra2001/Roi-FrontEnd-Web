import { notFound } from 'next/navigation';
import { getBlogPost, getBlogDetailSettings } from "../../../lib/strapi";
import "../../../components/Blog/Section/Blog.css";

import BlogDetailHeroSection from "../BlogDetail/BlogDetailHeroSection";
import BlogIntroSection from "../BlogDetail/BlogIntroSection";
import BlogRelatedSection from "../BlogDetail/BlogRelatedSection";
import BlogNumberSection from "../BlogDetail/BlogNumberSection";

// Any published post resolves on request — no rebuild needed for new slugs.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [detail, settings] = await Promise.all([getBlogPost(slug), getBlogDetailSettings()]);
  if (!detail) return { title: settings.notFoundTitle };

  const { post } = detail;
  return {
    title: post.seo?.metaTitle || `${post.title}${settings.metaTitleSuffix || ''}`,
    description: post.seo?.metaDescription || post.excerpt || post.content?.replace(/<[^>]*>?/gm, '').slice(0, 160),
    ...(post.seo?.keywords?.trim() ? { keywords: post.seo.keywords.trim() } : {}),
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const [detail, settings] = await Promise.all([getBlogPost(slug), getBlogDetailSettings()]);

  if (!detail) return notFound();

  const { post: currentBlog, related: relatedBlogs } = detail;

  return (
    <main className="case-study-detail-page-wrapper">
      <BlogDetailHeroSection currentBlog={currentBlog} backgroundVideo={settings.backgroundVideo} />
      <BlogIntroSection currentBlog={currentBlog} dateLabel={settings.dateLabel} categoryLabel={settings.categoryLabel} />
      <BlogRelatedSection
        relatedBlogs={relatedBlogs}
        kicker={settings.relatedKicker}
        title={settings.relatedTitle}
        buttonLabel={settings.relatedButtonLabel}
      />
      {settings.cta && <BlogNumberSection {...settings.cta} />}
    </main>
  );
}
