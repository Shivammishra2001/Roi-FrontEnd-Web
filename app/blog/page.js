import "../../components/Blog/Section/Blog.css";
import BlogHeroSetion from "../../components/Blog/Section/BlogHeroSetion";
import BlogCardSection from "../../components/Blog/Section/BlogCardSection";
import BlogNumberSectio from '../../components/Blog/Section/BlogNumberSectio'

export default function BlogPage() {
    return (
        <>
            <BlogHeroSetion />
            <BlogCardSection />
            <BlogNumberSectio/>
        </>
    );
}