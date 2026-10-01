import Link from 'next/link';

// Renders a CMS link: next/link for internal routes, a plain anchor for
// external URLs, in-page anchors (#work) and mailto:/tel: links.
export default function CmsLink({ href = '#', isExternal = false, children, ...rest }) {
    if (isExternal) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
                {children}
            </a>
        );
    }
    if (!href.startsWith('/') || href.startsWith('/#')) {
        return <a href={href} {...rest}>{children}</a>;
    }
    return <Link href={href} {...rest}>{children}</Link>;
}
