"use client";

import React from "react";
import Link from "next/link";
import LegalHero from "./LegalHero";
import "./Legal.css";

const tocItems = [
    { id: "intro", title: "Introduction & PII Overview", num: "01" },
    { id: "how-we-collect", title: "How We Collect Information", num: "02" },
    { id: "how-we-use", title: "How We Use Your Information", num: "03" },
    { id: "how-we-protect", title: "How We Protect Your Information", num: "04" },
    { id: "third-party-links", title: "Third Party Links", num: "05" },
    { id: "policy-changes", title: "Policy Changes", num: "06" },
    { id: "disclaimer", title: "Security & Legal Disclaimer", num: "07" },
    { id: "contact-us", title: "Contact & Further Inquiries", num: "08" },
];

export default function PrivacyPolicy() {
    return (
        <div className="legal-page-root">
            <LegalHero
                badge="LEGAL & PRIVACY COMPLIANCE"
                title="PRIVACY POLICY"
                effectiveDate="October 1, 2026"
                lastUpdated="October 1, 2026"
                description="ROI Mantra understands the privacy and security concerns you may have about your personal information. Acknowledging the sensitivity, we leave no stone unturned to protect your data from all sorts of risks, and make sure it is used in compliance with the law."
            />

            <section className="legal-main-section">
                <div className="srcn-container">
                    <div className="legal-grid-container">
                        {/* Sidebar Navigation */}
                        <aside className="legal-sidebar">
                            <div className="legal-nav-box">
                                <h3 className="legal-nav-title">
                                    <i className="fa fa-list-ul"></i> Table of Contents
                                </h3>
                                <ul className="legal-nav-list">
                                    {tocItems.map((item) => (
                                        <li key={item.id}>
                                            <a href={`#${item.id}`} className="legal-nav-link">
                                                <span>
                                                    <span className="num">{item.num}.</span>
                                                    {item.title}
                                                </span>
                                                <i className="fa fa-angle-right" style={{ fontSize: "12px", opacity: 0.5 }}></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="legal-help-card">
                                <h4 className="legal-help-title">Privacy Assistance</h4>
                                <p className="legal-help-text">
                                    Have concerns or wish to learn more about how your data is handled?
                                </p>
                                <a href="mailto:info@roimantra.com" className="legal-contact-item">
                                    <span className="legal-contact-icon">
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                    <span>info@roimantra.com</span>
                                </a>
                                <a href="tel:+91 9650095232" className="legal-contact-item">
                                    <span className="legal-contact-icon">
                                        <i className="fa fa-phone"></i>
                                    </span>
                                    <span>+91 9650095232</span>
                                </a>
                                <div style={{ marginTop: "16px" }}>
                                    <Link href="/contact" className="common-wrapper-btn" style={{ background: "#f5c542", borderColor: "#f5c542", color: "#000", width: "100%", justifyContent: "center" }}>
                                        Contact Us Form
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Content Area */}
                        <article className="legal-content-card">
                            {/* Section 1: Intro */}
                            <section id="intro" className="legal-section-block">
                            
                                <h2 className="legal-section-title">Privacy Overview</h2>
                                <p className="legal-body-text">
                                    ROI Mantra understands the privacy and security concerns you may have about your personal information. Acknowledging the sensitivity, we leave no stone unturned to protect your data from all sorts of risks, and make sure it is used in compliance with the law. This privacy policy has been compiled to better serve those who are concerned with how their &lsquo;Personally Identifiable Information&rsquo; (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context.
                                </p>
                                <p className="legal-body-text">
                                    Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                        
                            <section id="how-we-collect" className="legal-section-block">
                               
                                <h2 className="legal-section-title">How We Collect Information</h2>
                                
                                <h3 className="legal-subtitle">(a) Log Files</h3>
                                <p className="legal-body-text">
                                    Like many other Web sites, our site makes use of log files. The information inside the log files includes internet protocol ( IP ) addresses, type of browser, Internet Service Provider ( ISP ), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user&apos;s movement around the site, and gather demographic information. IP addresses, and other such information are not linked to any information that is personally identifiable.
                                </p>

                                <h3 className="legal-subtitle">(b) Cookies and Web Beacons</h3>
                                <p className="legal-body-text">
                                    We use cookies to store information about visitors&apos; preferences, record user-specific information on which pages the user access or visit, customize Web page content based on visitors browser type or other information that the visitor sends via their browser.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                            <section id="how-we-use" className="legal-section-block">
             
                                <h2 className="legal-section-title">How We Use Your Information</h2>
                                <p className="legal-body-text">
                                    We may use the information we collect from you when you fill out a form or sign up for our newsletter, respond to a survey or marketing communication in the following ways:
                                </p>
                                <ul className="legal-list">
                                    <li className="legal-list-item">
                                        To allow us to better service you in responding to your requests.
                                    </li>
                                    <li className="legal-list-item">
                                        To send periodic emails regarding our services and vital updates.
                                    </li>
                                </ul>

                                <div className="legal-callout-box">
                                    <p>
                                        <strong>NOTE:</strong> We do not sell, misuse or distribute your data for any purpose, unless required by law or as authorized by you or your signatory. We are obligated to share your information in case it is required by law or when required by law-enforcement or government officials.
                                    </p>
                                </div>
                            </section>

                            <hr className="legal-divider" />

                    
                            <section id="how-we-protect" className="legal-section-block">
                      
                                <h2 className="legal-section-title">How We Protect Your Information</h2>
                                <p className="legal-body-text">
                                    We maintain strict technical, administrative, and physical safeguards to protect your personal information against loss, misuse, or unauthorized access. We train our employees to maintain appropriate standards of conduct with regard to the protection of information. We also take the necessary steps to require that third parties who assist in our provision of services follow our privacy practices and comply with data protection laws.
                                </p>
                                <p className="legal-body-text">
                                    Our data Privacy Policy is protected by Industry endorsed technology and widely deployed security protocol used in today&apos;s cut-throat market scenarios. Bringing such advanced and stringent security protocol into the practice ensures you a safe transmission of collected data.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                   
                            <section id="third-party-links" className="legal-section-block">
                            
                                <h2 className="legal-section-title">Third Party Links</h2>
                                <p className="legal-body-text">
                                    Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                       
                            <section id="policy-changes" className="legal-section-block">
                               
                                <h2 className="legal-section-title">Policy Changes</h2>
                                <p className="legal-body-text">
                                    These policies may be amended by us at any time and without notice, but will be posted on this page. You agree that your continued use of our websites, product or service after that date will constitute your consent and acceptance of the amendment.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                     
                            <section id="disclaimer" className="legal-section-block">
                            
                                <h2 className="legal-section-title">Disclaimer</h2>
                                <p className="legal-body-text">
                                    Information shared over the Internet is subject to several security perils. Therefore, in the case of any losses/damage, alteration or deletion, incidental or consequential or any malfunction in the system due to unlawful use or access, ROI Mantra holds no responsibilities for any such consequences.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                  
                            <section id="contact-us" className="legal-section-block">
                         
                                <h2 className="legal-section-title">Contact & Further Inquiries</h2>
                                <div className="legal-callout-box" style={{ background: "#ffffff", border: "1px solid #e2ded5", borderLeft: "4px solid #f5c542" }}>
                                    <p className="legal-body-text" style={{ marginBottom: "14px" }}>
                                        If you wish to learn more about our Privacy Policy, fill out our{" "}
                                        <Link href="/contact" style={{ color: "#d99b00", textDecoration: "underline", fontWeight: 600 }}>
                                            contact form
                                        </Link>{" "}
                                        or simply call{" "}
                                        <a href="tel:+911204663004" style={{ color: "#d99b00", textDecoration: "underline", fontWeight: 600 }}>
                                            +91-120-466-3004
                                        </a>
                                        . You can also write to us at{" "}
                                        <a href="mailto:sales@roimantra.com" style={{ color: "#d99b00", textDecoration: "underline", fontWeight: 600 }}>
                                            sales@roimantra.com
                                        </a>
                                        .
                                    </p>
                                </div>
                            </section>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
}
