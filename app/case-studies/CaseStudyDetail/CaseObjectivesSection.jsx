"use client";

const CaseObjectivesSection = ({ currentCase }) => {
    const objectives =
        currentCase?.strategicObjectives ||
        currentCase?.objectives ||
        currentCase?.achievements || [
            "Increase visibility across high-intent healthcare searches.",
            "Build stronger topical authority around healthcare services.",
            "Improve qualified organic traffic and discovery.",
            "Create a scalable SEO foundation for future growth."
        ];

    const obstacles =
        currentCase?.obstacles ||
        currentCase?.challenges || [
            "Highly competitive healthcare search landscapes.",
            "Fragmented information across multiple services.",
            "Existing pages lacked clear search intent alignment.",
            "Content needed to scale without losing quality."
        ];

    return (
        <section className="case-objectives" id="objectives">
            <div className="container case-container-objectives">
                <div className="case-objectives-grid">
                    <div className="objective-column">
                        <div className="section-label case-kicker">
                            <span>Goals</span>
                        </div>
                        <h2 className="objective-title">Objectives</h2>
                        <div className="objective-list">
                            {objectives.map((item, index) => (
                                <div className="objective-item" key={index}>
                                    <span className="objective-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="objective-item-content">
                                        <p>{item}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="objective-column">
                        <div className="section-label case-kicker">
                            <span>Obstacles</span>
                        </div>
                        <h2 className="objective-title">Challenges</h2>
                        <div className="objective-list">
                            {obstacles.map((item, index) => (
                                <div className="objective-item" key={index}>
                                    <span className="objective-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="objective-item-content">
                                        <p>{item}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseObjectivesSection;
