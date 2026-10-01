import { Fragment } from "react";
import Link from "next/link";
import LegalHero from "./LegalHero";
import LegalBlocks from "./LegalBlocks";
import { formatDate } from "../../lib/format";
import "./Legal.css";

// One legal page (Privacy Policy, Terms & Conditions). `page` is already
// merged with the built-in copy (lib/legal.js), so every field is present.
export default function LegalPage({ page }) {
    const { helpCard, sections } = page;
    const phoneHref = `tel:${helpCard.phone}`;

    return (
        <div className="legal-page-root">
            <LegalHero
                badge={page.badge}
                title={page.title}
                effectiveDate={formatDate(page.effectiveDate)}
                lastUpdated={formatDate(page.lastUpdated)}
                description={page.heroDescription}
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
                                    {sections.map((item, i) => (
                                        <li key={item.anchorId}>
                                            <a href={`#${item.anchorId}`} className="legal-nav-link">
                                                <span>
                                                    <span className="num">{String(i + 1).padStart(2, "0")}.</span>
                                                    {item.navTitle}
                                                </span>
                                                <i className="fa fa-angle-right" style={{ fontSize: "12px", opacity: 0.5 }}></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="legal-help-card">
                                <h4 className="legal-help-title">{helpCard.title}</h4>
                                <p className="legal-help-text">
                                    {helpCard.text}
                                </p>
                                <a href={`mailto:${helpCard.email}`} className="legal-contact-item">
                                    <span className="legal-contact-icon">
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                    <span>{helpCard.email}</span>
                                </a>
                                <a href={phoneHref} className="legal-contact-item">
                                    <span className="legal-contact-icon">
                                        <i className="fa fa-phone"></i>
                                    </span>
                                    <span>{helpCard.phone}</span>
                                </a>
                                <div style={{ marginTop: "16px" }}>
                                    <Link href={helpCard.buttonHref} className="common-wrapper-btn" style={{ background: "#f5c542", borderColor: "#f5c542", color: "#000", width: "100%", justifyContent: "center" }}>
                                        {helpCard.buttonLabel}
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Content Area */}
                        <article className="legal-content-card">
                            {sections.map((item, i) => (
                                <Fragment key={item.anchorId}>
                                    {i > 0 && <hr className="legal-divider" />}
                                    <section id={item.anchorId} className="legal-section-block">
                                        <h2 className="legal-section-title">{item.heading}</h2>
                                        <LegalBlocks blocks={item.content} calloutStyle={item.calloutStyle} />
                                    </section>
                                </Fragment>
                            ))}
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
}
