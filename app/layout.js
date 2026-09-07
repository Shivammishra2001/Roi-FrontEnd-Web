import Script from 'next/script';
import App from './App.js';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import '../public/styles/style.css';
import '../public/styles/responsive.css';
import { getHomePageData } from '../lib/strapi';

export const metadata = {
    title: 'ROI Mantra',
    description: 'ROI Mantra website',
};

export default async function RootLayout({ children }) {
    const data = await getHomePageData();
    const { navbar, footer, loader } = data.global;

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
            </head>
            <body suppressHydrationWarning>
                <App loader={loader}>
                    <Header {...navbar} />
                    {children}
                    <Footer {...footer} />
                </App>
                <Script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" strategy="beforeInteractive" />
            </body>
        </html>
    );
}
