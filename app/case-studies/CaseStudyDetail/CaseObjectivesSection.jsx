"use client";

const CaseObjectivesSection = ({ currentCase }) => {
    const achievements = currentCase?.achievements || [
        "Increase visibility across high-intent healthcare searches.",
        "Build stronger topical authority around healthcare services.",
        "Improve qualified organic traffic and discovery.",
        "Create a scalable SEO foundation for future growth."
    ];

    const obstacles = currentCase?.obstacles || [
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
                        <div class="section-label case-kicker"><span>  Objectives</span>
                          
                        </div>
                        <h2 className="objective-title">What We Set Out to Achieve</h2>
                        <div className="objective-list">
                            {achievements.map((item, index) => (
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
                        <div class="section-label case-kicker"><span>  Challenges</span>
                          
                        </div>
                        <h2 className="objective-title">What Stood in the Way</h2>
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
