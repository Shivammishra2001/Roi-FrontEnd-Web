import HomePage from '../components/Home/HomePage.jsx';
import { getHomePage } from '../lib/strapi';
import { text } from '../lib/cms';

export async function generateMetadata() {
    const seo = (await getHomePage())?.seo;
    return {
        title: text(seo?.metaTitle, 'ROI Mantra'),
        description: text(seo?.metaDescription, 'ROI Mantra website'),
    };
}

export default async function Home() {
    const page = await getHomePage();
    return <HomePage sections={page?.sections} />;
}
