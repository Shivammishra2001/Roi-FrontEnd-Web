import Link from 'next/link';
import React from 'react';
import './Footer.css';
export default function Footer() {
    return (
        <>
            <footer className="footer-section" style={{ zIndex: 0 }}>
                <div className="srcn-container">
                    <div className="footer-wrapper-top-box">
                        <div className="footer-row-area">
                            <div className="footer-logo">
                                <h2 className="footer-logo-tilte"> ROI MANTRA</h2>
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
                           Copyright 2026 ROI Mantra. | All Rights Reserved
                        </div>

                        <div className="footer-bottom-right">
                            <a href="/#">Cookies Policy</a>
                            <span aria-hidden="true">•</span>
                            <a href="/#">Privacy Policy</a>
                            <span aria-hidden="true">•</span>
                            <a href="/#">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
