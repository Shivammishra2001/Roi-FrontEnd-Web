'use client';
import React from 'react';
import './Footer.css';
export default function Footer({
    footerLogoText,
    reachUsEmailLabel,
    reachUsEmailHref,
    reachUsLocation1,
    reachUsLocation2,
    footerLinkColumns,
    socialLinks,
}) {
    const [capabilitiesColumn, companyColumn] = footerLinkColumns;
    return (
        <>
            <footer className="footer-section" style={{ zIndex: 0 }}>
                <div className="srcn-container">
                    <div className="footer-wrapper-top-box">
                        <div className="footer-row-area">
                            <div className="footer-logo">
                                <h2 className="footer-logo-tilte">{footerLogoText}</h2>
                            </div>
                            <div className="footer-main-menu-box">
                                <div className="footer-main-menu-row">
                                    <div className="footer-main-menu-column">
                                        <h4 className="footer-main-menu-title">{capabilitiesColumn.columnTitle}</h4>
                                        <div className="footer-main-menu-wrapper">
                                            <ul className="footer-main-menu-list">
                                                {capabilitiesColumn.links.map((link, i) => (
                                                    <li className="footer-main-menu-itme" key={i}>
                                                        <a href={link.href} className="footer-main-menu-link">{link.label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer-main-menu-column">
                                        <h4 className="footer-main-menu-title">{companyColumn.columnTitle}</h4>
                                        <div className="footer-main-menu-wrapper">
                                            <ul className="footer-main-menu-links">
                                                {companyColumn.links.map((link, i) => (
                                                    <li className="footer-main-menu-itme" key={i}>
                                                        <a href={link.href} className="footer-main-menu-link">{link.label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer-main-menu-column footer-main-menu-contact">
                                        <h4 className="footer-main-menu-title">Reach Us</h4>
                                        <p>
                                            <a href={reachUsEmailHref}>{reachUsEmailLabel}</a>
                                        </p>
                                        <p>{reachUsLocation1}</p>
                                        <p>{reachUsLocation2}</p>
                                    </div>
                                    <div className="footer-main-menu-column">
                                        <h4 className="footer-main-menu-title">Follow Us</h4>
                                        <div className="footer-social-icons">
                                            <div className="footer-social-icons-wrapper">
                                                {socialLinks.map((social, i) => (
                                                    <a href={social.href} className="footer-social-icons-box" key={i}>
                                                        <i className={`fa ${social.iconName}`}></i>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
