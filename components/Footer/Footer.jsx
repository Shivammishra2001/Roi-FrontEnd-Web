import React from 'react';
import './Footer.css';

export default function Footer({ footer }) {
    const legalLinks = footer?.legalLinks || [];

    return (
        <>
            <footer className="footer-section" style={{ zIndex: 0 }}>
                <div className="srcn-container">
                    <div className="footer-wrapper-top-box">
                        <div className="footer-row-area">
                            <div className="footer-logo">
                                <h2 className="footer-logo-tilte"> {footer?.footerLogoText}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-bottom-left">
                           {footer?.copyrightText}
                        </div>

                        <div className="footer-bottom-right">
                            {legalLinks.map((link, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <span aria-hidden="true">•</span>}
                                    <a
                                        href={link.href}
                                        {...(link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    >
                                        {link.label}
                                    </a>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
