import Link from 'next/link';
import React from 'react';
import { text } from '../../lib/cms';
import './Footer.css';
export default function Footer({ footer }) {
    const logoText = text(footer?.footerLogoText, 'ROI MANTRA');
    const copyright = text(footer?.copyrightText, 'Copyright 2026 ROI Mantra. | All Rights Reserved');
    return (
        <>
            <footer className="footer-section" style={{ zIndex: 0 }}>
                <div className="srcn-container">
                    <div className="footer-wrapper-top-box">
                        <div className="footer-row-area">
                            <div className="footer-logo">
                                <h2 className="footer-logo-tilte"> {logoText}</h2>
                            </div>
                            {/* <div className="footer-main-menu-box">
                                <div className="footer-main-menu-row">
                                    <div className="footer-main-menu-column">
                                        <h4 className="footer-main-menu-title">Capabilities</h4>
                                        <div className="footer-main-menu-wrapper">
                                            <ul className="footer-main-menu-list">
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">SEO</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">AEO</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">GEO</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">ASO</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">Performance</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">Social</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">Content</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">Web</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">CRO</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer-main-menu-column">
                                        <h4 className="footer-main-menu-title">Company</h4>
                                        <div className="footer-main-menu-wrapper">
                                            <ul className="footer-main-menu-links">
                                                <li className="footer-main-menu-itme">
                                                    <Link href="/case-studies" className="footer-main-menu-link">Case Studies</Link>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">About</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">Careers</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <Link href="/blog" className="footer-main-menu-link">Blog</Link>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <a href="#" className="footer-main-menu-link">Press</a>
                                                </li>
                                                <li className="footer-main-menu-itme">
                                                    <Link href="/contact" className="footer-main-menu-link">Contact</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer-main-menu-column footer-main-menu-contact">
                                        <h4 className="footer-main-menu-title">Reach Us</h4>
                                        <p>
                                            <a href="mailto:hello@roimantra.com">hello@roimantra.com</a>
                                        </p>
                                        <p>Dallas, TX</p>
                                        <p>Delhi NCR</p>
                                    </div>
                                    <div className="footer-main-menu-column">
                                        <h4 className="footer-main-menu-title">Follow Us</h4>
                                        <div className="footer-social-icons">
                                            <div className="footer-social-icons-wrapper">
                                                <a href="#" className="footer-social-icons-box">
                                                    <i className="fa fa-facebook"></i>
                                                </a>
                                                <a href="#" className="footer-social-icons-box">
                                                    <i className="fa fa-times"></i>
                                                </a>
                                                <a href="#" className="footer-social-icons-box">
                                                    <i className="fa fa-linkedin"></i>
                                                </a>
                                                <a href="#" className="footer-social-icons-box">
                                                    <i className="fa fa-instagram"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-bottom-left">
                           {copyright}
                        </div>

                        {/* Kept static: the CMS `legalLinks` are still placeholders
                            (Cookies Policy / Sitemap → "/#") with no matching pages. */}
                        <div className="footer-bottom-right">
                            <Link href="/privacy-policy">Privacy Policy</Link>
                            <span aria-hidden="true">•</span>
                            <Link href="/terms-and-conditions">Terms & Conditions</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
