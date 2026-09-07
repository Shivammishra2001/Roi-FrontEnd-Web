export default function CreativeFutureSection({ eyebrow, heading, statCards }) {
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
                            {statCards.map((card, i) => (
                                <div className="creative-future-col" key={i}>
                                    <div className="creative-future-card">
                                        <div className="creative-future-card-inner">
                                            <div className="creative-future-content">
                                                <div className="creative-future-number">{card.number}</div>
                                                <h3 className="creative-future-title">{card.title}</h3>
                                                <p className="creative-future-text">
                                                    {card.body}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
