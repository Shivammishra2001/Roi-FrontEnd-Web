import React from 'react';
import { text, list } from './aboutData';

const DEFAULT_PARAGRAPHS = [
    "ROI Mantra began inside i2k2 Networks in 1999 — one of India's first cloud hosting and data centre companies. We ran servers. Then we built the websites that lived on them. Then we taught search engines to find those websites.",
    'By 2013, the marketing arm had outgrown the server room. ROI Mantra stepped out.',
    "Twelve years on, we're still obsessed with the same question we started with:",
];

export default function OurHistory(props) {
    const paragraphs = list(props.paragraphs, DEFAULT_PARAGRAPHS);
    return (
        <section className="history-section-area">
            <div className="srcn-container">
                <div className="history-container-area">
                    <div className="history-top-label">
                        <div className="stats-eyebrow">
                            <span className="arr">
                                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                            </span>
                            {text(props.eyebrow, 'OUR HISTORY')}
                        </div>
                    </div>
                    <div className="history-grid">
                        <div className="history-heading-col">
                            <h2 className="history-title">{text(props.heading, 'A short one.')}</h2>
                        </div>
                        <div className="history-story-col-right">
                            <div className="history-story-box">
                                {paragraphs.map((paragraph, i) => (
                                    <div className="history-story" key={i}>
                                        <p>{paragraph}</p>
                                    </div>
                                ))}

                                <div className="history-story">
                                    <p className="history-question">
                                        {text(props.question, 'how do you make a brand findable, chosen, and remembered?')}
                                    </p>
                                </div>
                            </div>
                            <div className="history-footer">
                                <p className="history-footer-sub">
                                    {text(props.footerSub, 'The answer has moved from HTML meta tags to AI citations.')}
                                </p>
                                <p className="history-footer-main">
                                    {text(props.footerMain, "The question hasn't moved at all.")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}