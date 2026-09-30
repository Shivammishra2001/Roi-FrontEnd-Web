"use client";

const CaseIntroSection = ({ currentCase, clientLabel, industryLabel, servicesLabel, durationLabel }) => {
    const clientName = currentCase?.client;
    const challengeParagraphs = currentCase?.challengeParagraphs || [];
    const challengePoints = currentCase?.challengePoints || [];
    const solutionParagraphs = currentCase?.solutionParagraphs || [];
    const solutionPoints = currentCase?.solutionPoints || [];

    return (
        <section className="case-intro-section-area">
            <div className="container">
                <div className="case-intro-grid">
                    <aside className="case-side-nav-lift">
                        <div className="case-side-nav-area">
                            <a href="#problem" className="case-side-nav-row">
                                
                                <div className="case-side-contnet-area">
                                    <span>{clientLabel}</span>
                                    <h5>{clientName}</h5>
                                </div>
                            </a>
                        </div>
                        <div className="case-side-nav-area">
                            <a href="#solution" className="case-side-nav-row">
                                
                                <div className="case-side-contnet-area">
                                    <span>{industryLabel}</span>
                                    <h5>{currentCase?.industry}</h5>
                                </div>
                            </a>
                        </div>
                        <div className="case-side-nav-area">
                            <a href="#objectives" className="case-side-nav-row">
                                <div className="case-side-contnet-area">
                                    <span>{servicesLabel}</span>
                                    <h5>{currentCase?.services}</h5>
                                </div>
                            </a>
                        </div>
                        <div className="case-side-nav-area">
                            <a href="#impact" className="case-side-nav-row">
                                <div className="case-side-contnet-area">
                                    <span>{durationLabel}</span>
                                    <h5>{currentCase?.duration}</h5>
                                </div>
                            </a>
                        </div>
                    </aside>

                    <div className="case-main-content-area">
                        <div className="case-main-content">
                            <div id="problem">
                                <div className="case-content-area-box">
                                    <div className="case-kicker">
                                        <span className="arr"><i className="fa fa-long-arrow-right"></i></span> {currentCase?.challengeKicker}
                                    </div>
                                    <h2 className="case-content-title">
                                        {currentCase?.challengeTitle}
                                    </h2>
                                    {challengeParagraphs.map((para, idx) => (
                                        <p className="case-content-text" key={idx}>
                                            {para}
                                        </p>
                                    ))}
                                </div>
                                <div className="case-content-list-area">
                                    <ul className="case-content-list">
                                        {challengePoints.map((pt, idx) => (
                                            <li key={idx}>{pt}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="case-solution" id="solution">
                                <div className="case-content-area-box">
                                    <h2 className="case-content-title">
                                        {currentCase?.solutionTitle}
                                    </h2>
                                    {solutionParagraphs.map((para, idx) => (
                                        <p className="case-content-text" key={idx}>
                                            {para}
                                        </p>
                                    ))}
                                </div>
                                <div className="case-content-list-area">
                                    <ul className="case-content-list">
                                        {solutionPoints.map((pt, idx) => (
                                            <li key={idx}>{pt}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseIntroSection;