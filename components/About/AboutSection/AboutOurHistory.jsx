import React from 'react';

export default function OurHistory() {
    return (
        <section className="history-section-area">
            <div className="srcn-container">
                <div className="history-container-area">
                    <div className="history-top-label">
                        <div className="stats-eyebrow">
                            <span className="arr">
                                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                            </span>
                            OUR HISTORY
                        </div>
                    </div>
                    <div className="history-grid">
                        <div className="history-heading-col">
                            <h2 className="history-title">A short one.</h2>
                        </div>
                        <div className="history-story-col-right">
                            <div className="history-story-box">
                                <div className="history-story">
                                    <p>
                                        ROI Mantra began inside i2k2 Networks in 1999 — one of India's
                                        first cloud hosting and data centre companies. We ran servers.
                                        Then we built the websites that lived on them. Then we taught
                                        search engines to find those websites.
                                    </p>
                                </div>

                                <div className="history-story">
                                    <p>
                                        By 2013, the marketing arm had outgrown the server room. ROI Mantra
                                        stepped out.
                                    </p>
                                </div>

                                <div className="history-story">
                                    <p>
                                        Twelve years on, we're still obsessed with the same question we
                                        started with:
                                    </p>
                                </div>

                                <div className="history-story">
                                    <p className="history-question">
                                        how do you make a brand findable, chosen, and remembered?
                                    </p>
                                </div>
                            </div>
                            <div className="history-footer">
                                <p className="history-footer-sub">
                                    The answer has moved from HTML meta tags to AI citations.
                                </p>
                                <p className="history-footer-main">
                                    The question hasn't moved at all.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}