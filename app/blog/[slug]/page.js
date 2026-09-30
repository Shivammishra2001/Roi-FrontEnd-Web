import { notFound } from 'next/navigation';
import { blogs } from "../../../components/Blog/data/blogData";
import "../../../components/Blog/Section/Blog.css";

import BlogDetailHeroSection from "../BlogDetail/BlogDetailHeroSection";
import BlogIntroSection from "../BlogDetail/BlogIntroSection";
import BlogRelatedSection from "../BlogDetail/BlogRelatedSection";
import BlogNumberSection from "../BlogDetail/BlogNumberSection";

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams?.slug);
  if (!blog) return { title: 'Article not found | ROI Mantra' };
  return {
    title: `${blog.title} | ROI Mantra`,
    description: blog.excerpt || blog.content?.replace(/<[^>]*>?/gm, '').slice(0, 160),
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const currentBlog = blogs.find((b) => b.slug === resolvedParams?.slug);

  if (!currentBlog) return notFound();

  // Related blogs (excluding current blog)
  const relatedBlogs = blogs.filter((b) => b.id !== currentBlog.id);

  return (
    <main className="case-study-detail-page-wrapper">
      <BlogDetailHeroSection currentBlog={currentBlog} />
      <BlogIntroSection currentBlog={currentBlog} />
      <BlogRelatedSection relatedBlogs={relatedBlogs} />
      <BlogNumberSection />
    </main>
  );
}
