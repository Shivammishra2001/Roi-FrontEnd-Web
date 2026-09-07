import BlogCard from '../../components/Blog/BlogCard.jsx';
import { blogs } from "../../components/Blog/data/blogData";

export const metadata = {
  title: 'Blog | ROI Mantra',
  description: 'Read the latest articles and insights from ROI Mantra.',
};

export default function BlogPage() {
  return (
    <>
      <section className="blog-post-header hero-section">
        <div className="srcn-container">
          <a href="#" className="blog-post-category">Our Blog</a>
          <h1 className="in-view">Creative Marketing Insights That Inspire Innovation, Growth, and Lasting Business Success</h1>
        </div>
      </section>
      <BlogCard blogs={blogs} />
    </>
  );
}
