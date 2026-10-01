"use client";

import React from "react";
import Link from "next/link";
import LegalHero from "./LegalHero";
import "./Legal.css";

const tocItems = [
    { id: "charges", title: "Charges", num: "01" },
    { id: "agreement-term", title: "Agreement Term & Refunds", num: "02" },
    { id: "no-liability", title: "No Liability", num: "03" },
    { id: "billing", title: "Billing & Remittance", num: "04" },
    { id: "cancellation", title: "Cancellation of Services", num: "05" },
    { id: "communication", title: "Communication", num: "06" },
    { id: "terms-conditions", title: "Terms and Conditions", num: "07" },
    { id: "governing-law", title: "Governing Law and Venue", num: "08" },
];

export default function TermsConditions() {
    return (
        <div className="legal-page-root">
            <LegalHero
                badge="TERMS OF SERVICE & ENGAGEMENT"
                title="TERMS & CONDITIONS"
                effectiveDate="October 1, 2026"
                lastUpdated="October 1, 2026"
                description="Please review our terms of engagement, billing structure, cancellation policies, and legal stipulations governing the purchase and provision of ROI Mantra, Inc. services."
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
                                <h4 className="legal-help-title">Billing & Legal Support</h4>
                                <p className="legal-help-text">
                                    Have inquiries regarding onboarding charges, invoice payments, or service terms?
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
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Content Area */}
                        <article className="legal-content-card">
                            {/* Section 1: Charges */}
                            <section id="charges" className="legal-section-block">
                           
                                <h2 className="legal-section-title">Charges:</h2>
                                <p className="legal-body-text">
                                    In order for onboarding to occur, first month charges must be paid. Charges are outlined in your proposal at a monthly rate. Recurring payments are an option to be billed monthly, or at greater time increments, depending on customer preference. Customer is generally billed on the first of the month, excluding invoices for the first month of services, which are to be pro-rated according to their official onboarding date.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                            {/* Section 2: Agreement Term, Cancellation and Refunds */}
                            <section id="agreement-term" className="legal-section-block">
                            
                                <h2 className="legal-section-title">Agreement Term, Cancellation and Refunds:</h2>
                                <p className="legal-body-text">
                                    Customers have agreed to pay the amount agreed upon on their customized proposal, at the beginning of each month that services are to be rendered. Services come only in monthly increments. Except for the 30 day Money back Guarantee for the 1st month of mangement fee, ROI Mantra, Inc. will not issue refunds for services already rendered. A customer may cancel their service at any time, but agrees to provide ROI Mantra, Inc. with at least 10 days&apos; advance notice before the end of the current month, in order to avoid future charges.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                            {/* Section 3: No Liability */}
                            <section id="no-liability" className="legal-section-block">
                          
                                <h2 className="legal-section-title">No Liability:</h2>
                                <p className="legal-body-text">
                                    ROI Mantra, Inc., its suppliers, affiliates, officers, directors, employees, subsidiaries, and assigns, shall not be liable for any damages whatsoever, including, without limitation, direct or indirect damages for loss of business profit, personal injuries, business interruptions, state licensing requirements, city ordinances, business information loss, or any other loss. The maximum liability shall be limited to the amount actually paid for the services provided.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                            {/* Section 4: Billing */}
                            <section id="billing" className="legal-section-block">
                        
                                <h2 className="legal-section-title">Billing:</h2>
                                <p className="legal-body-text">
                                    Customers may pay invoices via credit card remittance to ROI Mantra, Inc.&apos;s payment portal on{" "}
                                    <a
                                        href="https://www.roimantra.com/pay"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#d99b00", textDecoration: "underline", fontWeight: 600 }}
                                    >
                                        www.roimantra.com/pay
                                    </a>
                                    , ACH remittance, wire remittance, recurring bank draft payments, or check remittance to 8330 LBJ Fwy Ste. 370, Dallas, TX 75243.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                            {/* Section 5: Cancellation of Services */}
                            <section id="cancellation" className="legal-section-block">
                    
                                <h2 className="legal-section-title">Cancellation of Services:</h2>
                                <p className="legal-body-text">
                                    If customer wishes to cancel their service, they must request to cancel service by sending an email or calling ROI Mantra, Inc. with at least a 30 days&apos; advanced notice of the following month. However, to complete the cancellation process, customer must receive a cancellation acknowledgement in writing to prevent services from being performed past the cancelation month.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                            {/* Section 6: Communication */}
                            <section id="communication" className="legal-section-block">
                      
                                <h2 className="legal-section-title">Communication:</h2>
                                <p className="legal-body-text">
                                    The customer agrees to be supportive of their digital marketing campaign and agrees to be responsive to ROI Mantra, Inc. requests in a reasonable period of time, and acknowledges if they are not, it may affect performance with no altering of service costs.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                            {/* Section 7: Terms and Conditions */}
                            <section id="terms-conditions" className="legal-section-block">
                    
                                <h2 className="legal-section-title">Terms and Conditions:</h2>
                                <p className="legal-body-text">
                                    ROI Mantra, Inc. may change its terms and conditions without prior notice, at its sole discretion. To document your terms and conditions for your service, we recommend that you print these terms and conditions and store them in a file or electronically.
                                </p>
                            </section>

                            <hr className="legal-divider" />

                            {/* Section 8: Governing Law and Venue */}
                            <section id="governing-law" className="legal-section-block">
                         
                                <h2 className="legal-section-title">Governing Law and Venue:</h2>
                                <p className="legal-body-text">
                                    By purchasing ROI Mantra, Inc.&apos;s service you agree that your agreement shall be governed by the laws of the State of Texas. You also agree and hereby submit to the jurisdiction and venue of the State of Texas, County of Dallas, with respect to any such matters relating to your purchase of ROI Mantra, Inc.&apos;s services.
                                </p>
                            </section>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
}
