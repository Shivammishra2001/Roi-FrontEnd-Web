import { text, list, mediaUrl } from '../../../lib/cms';

const BODY = 'Partnering with visionary brands to deliver measurable impact.';
const DEFAULT_CARDS = [
    { number: '98%', title: 'Success Through Our Clients', body: BODY },
    { number: '15M', title: 'Unmatched Success Record', body: BODY },
    { number: '$423K', title: 'High-Value Projects Delivered', body: BODY },
    { number: '83+', title: 'Our Expert Members', body: BODY },
];

export default function CreativeFutureSection({ data = {} }) {
    const eyebrow = text(data.eyebrow, '⟶ In their words');
    const heading = text(data.heading, 'Future-Ready Creativity');
    const cards = list(data.statCards, DEFAULT_CARDS).filter(Boolean);

    return (
        <>
            <section className="creative-future-section-area">
                <div className="srcn-container">
                    <div className="common-wrapper-top-box">
                        <div className="common-row-aea">
                            <div className="common-top-header">
                                <div className="Believe-subtitle">
                                    <span>{eyebrow}</span>
                                </div>
                                <h2 className="common-top-heading">
                                    {heading}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="creative-future-wrapper-top-box">
                        <div className="creative-future-grid">
                            {cards.map((card, i) => {
                                const fallback = DEFAULT_CARDS[i] || {};
                                // The icon is the card's ::after background (style.css);
                                // without a CMS icon the per-card CSS default applies.
                                const icon = mediaUrl(card.icon);
                                return (
                                    <div className="creative-future-col" key={`${card.number}-${i}`}>
                                        <div
                                            className="creative-future-card"
                                            style={icon ? { '--future-icon': `url("${icon}")` } : undefined}
                                        >
                                            <div className="creative-future-card-inner">
                                                <div className="creative-future-content">
                                                    <div className="creative-future-number">{text(card.number, fallback.number)}</div>
                                                    <h3 className="creative-future-title">{text(card.title, fallback.title)}</h3>
                                                    <p className="creative-future-text">
                                                        {text(card.body, fallback.body)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
