"use client";

const CaseImpactSection = ({ currentCase }) => {
    const defaultMetrics = [
        {
            label: "Organic Traffic Growth",
            fromTo: "55,374 → 106,164",
            value: "92% ↑",
        },
        {
            label: "Total Ranking Keywords",
            fromTo: "11,331 → 56,702",
            value: "400% ↑",
        },
        {
            label: "Top 3 Ranking Keywords",
            fromTo: "228 → 346",
            value: "51.75% ↑",
        },
        {
            label: "Search Impressions",
            fromTo: "Growth",
            value: "415% ↑",
        },
        {
            label: "Organic Search Clicks",
            fromTo: "Growth",
            value: "84% ↑",
        },
    ];

    const metrics = currentCase?.impactMetrics || defaultMetrics;

    return (
        <section className="case-impact" id="impact">
            <div className="container">
                <div className="impact-heading-wrap">
                    <div className="case-kicker">
                        <span className="arr"><i className="fa fa-long-arrow-right"></i></span> The Results
                    </div>
                    <h2 className="case-content-title">The Impact</h2>
                </div>

                <div className="impact-grid">
                    {metrics.map((card, idx) => (
                        <div className="impact-card" key={idx}>
                            <div className="impact-label">{card.label}</div>
                            <div className="impact-traffic-content">
                                <span>{card.fromTo}</span>
                                <div className="impact-value">{card.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseImpactSection;
