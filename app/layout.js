import Script from 'next/script';
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import App from './App.js';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { getGlobal } from '../lib/strapi';
import '../public/styles/style.css';
import '../public/styles/responsive.css';

// Self-hosted at build time (no request to Google, no render-blocking
// stylesheet). CSS uses them as var(--font-anton) / var(--font-inter) /
// var(--font-jetbrains-mono).
const anton = Anton({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-anton' });
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-jetbrains-mono' });

const FONT_AWESOME_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

// Navbar/footer/loader come from Strapi's Global entry, cached with the
// pages (ISR) and refreshed when Strapi content changes.
export const revalidate = 3600;

export async function generateMetadata() {
    const { defaultSeo } = await getGlobal();
    return {
        title: defaultSeo?.metaTitle,
        description: defaultSeo?.metaDescription,
        // Site-wide default; a page with its own Meta Keywords overrides it.
        ...(defaultSeo?.keywords?.trim() ? { keywords: defaultSeo.keywords.trim() } : {}),
    };
}

export default async function RootLayout({ children }) {
    const { navbar, footer, loader } = await getGlobal();

    return (
        <html lang="en" className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <head>
                {/* Icons: loaded without blocking the first paint (a stylesheet
                    added by script doesn't hold up rendering). */}
                <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${FONT_AWESOME_CSS}';document.head.appendChild(l);})();`,
                    }}
                />
                <noscript>
                    <link rel="stylesheet" href={FONT_AWESOME_CSS} />
                </noscript>
            </head>
            <body suppressHydrationWarning>
                <App loader={loader}>
                    <Header navbar={navbar} />
                    {children}
                    <Footer footer={footer} />
                </App>
                {/* Google tag (gtag.js): loaded once the page is interactive, so
                    it doesn't compete with the first paint. */}
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-33CXWPBZ6J" strategy="afterInteractive" />
                <Script id="google-tag" strategy="afterInteractive">
                    {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-33CXWPBZ6J');
`}
                </Script>
            </body>
        </html>
    );
}
