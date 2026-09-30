import Script from 'next/script';
import App from './App.js';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import '../public/styles/style.css';
import '../public/styles/responsive.css';
export const metadata = {
    title: 'ROI Mantra',
    description: 'ROI Mantra website',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
                    rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
            </head>
            <body suppressHydrationWarning>
                <App>
                    <Header />
                    {children}
                    <Footer />
                </App>
                <Script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" strategy="beforeInteractive" />
            </body>
        </html>
    );
}
