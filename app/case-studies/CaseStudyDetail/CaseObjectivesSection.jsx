"use client";

const CaseObjectivesSection = ({ currentCase, objectivesLabel, objectivesTitle, challengesLabel, challengesTitle }) => {
    const achievements = currentCase?.achievements || [];

    const obstacles = currentCase?.obstacles || [];

    return (
        <section className="case-objectives" id="objectives">
            <div className="container case-container-objectives">
                <div className="case-objectives-grid">
                    <div className="objective-column">
                        <div className="section-label case-kicker"><span>  {objectivesLabel}</span>
                          
                        </div>
                        <h2 className="objective-title">{objectivesTitle}</h2>
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
                        <div className="section-label case-kicker"><span>  {challengesLabel}</span>
                          
                        </div>
                        <h2 className="objective-title">{challengesTitle}</h2>
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
