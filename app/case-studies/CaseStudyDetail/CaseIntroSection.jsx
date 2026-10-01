"use client";

const CaseIntroSection = ({ currentCase }) => {
    const clientName = currentCase?.client || "Graphic Era Hospital";
    const industry =
        currentCase?.sector ||
        currentCase?.industry ||
        "Healthcare and Life Sciences";

    const servicesSummary =
        currentCase?.servicesSummary || "SEO, AEO & GEO Strategy";


    const challengeParagraphs = currentCase?.challengeParagraphs || [];
    const challengePoints = currentCase?.challengePoints || [];

    const solutionLabel = currentCase?.solutionLabel || "OUR APPROACH";
    const solutionTitle = currentCase?.solutionTitle || "The Solution";
    const solutionParagraphs = currentCase?.solutionParagraphs || [
        `To accelerate ${clientName}'s digital growth and provide the needed exposure to their capabilities, ROI Mantra developed an integrated strategy comprising ${servicesSummary}.`
    ];
    const solutionPoints = currentCase?.solutionPoints || currentCase?.achievements || [];
    const solutionTags = currentCase?.solutionTags || [];

    const servicesHeading = currentCase?.servicesHeading || "SERVICES DEPLOYED";
    const servicesList =
        currentCase?.servicesList && currentCase.servicesList.length > 0
            ? currentCase.servicesList
            : [
                  "SEARCH ENGINE OPTIMIZATION",
                  "ANSWER ENGINE OPTIMIZATION",
                  "GENERATIVE ENGINE OPTIMIZATION",
              ];

    return (
        <>
            <section className="case-intro-section-area">
                <div className="container">
                    <div className="case-intro-grid">
                        {/* Sidebar */}
                        <aside className="case-side-nav-lift">
                            <div className="case-side-nav-area">
                                <a
                                    href="#problem"
                                    className="case-side-nav-row"
                                >
                                    <div className="case-side-contnet-area">
                                        <span>Client</span>
                                        <h5>{clientName}</h5>
                                    </div>
                                </a>
                            </div>

                            <div className="case-side-nav-area">
                                <a
                                    href="#solution"
                                    className="case-side-nav-row"
                                >
                                    <div className="case-side-contnet-area">
                                        <span>Industry</span>
                                        <h5>{industry}</h5>
                                    </div>
                                </a>
                            </div>

                            <div className="case-side-nav-area">
                                <a
                                    href="#objectives"
                                    className="case-side-nav-row"
                                >
                                    <div className="case-side-contnet-area">
                                        <span>Services</span>
                                        <h5>{servicesSummary}</h5>
                                    </div>
                                </a>
                            </div>

                        
                        </aside>

                        {/* Challenge Content */}
                        <div className="case-main-content-area">
                            <div className="case-main-content">
                                <div id="problem">
                                    <div className="case-content-area-box">
                                        <div className="case-kicker">
                                            <span className="arr">
                                                <i className="fa fa-long-arrow-right"></i>
                                            </span>
                                            {currentCase?.challengeKicker ||
                                                "The Challenge"}
                                        </div>

                                        <h2 className="case-content-title">
                                            {currentCase?.challengeTitle ||
                                                'No, We Don\'t Call It a "Problem"'}
                                        </h2>

                                        {challengeParagraphs.map(
                                            (para, idx) => (
                                                <p
                                                    className="case-content-text"
                                                    key={idx}
                                                >
                                                    {para}
                                                </p>
                                            )
                                        )}
                                    </div>

                                    {challengePoints.length > 0 && (
                                        <div className="case-content-list-area">
                                            <ul className="case-content-list">
                                                {challengePoints.map(
                                                    (point, idx) => (
                                                        <li key={idx}>
                                                            {point}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            {(solutionParagraphs.length > 0 ||
                solutionPoints.length > 0 ||
                solutionTags.length > 0 ||
                servicesList.length > 0) && (
                <section className="solution-section" id="solution">
                    <div className="container">
                        <div className="solution-container">
                            {/* Left: Services Deployed Box */}
                            {servicesList.length > 0 && (
                                <div className="services-box">
                                    {servicesHeading && (
                                        <div className="services-box-kicker">
                                            {servicesHeading}
                                        </div>
                                    )}

                                    <div className="services-list">
                                        {servicesList.map((service, idx) => (
                                            <div
                                                className="service-item"
                                                key={idx}
                                            >
                                                {service}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Right: Solution Content */}
                            <div className="solution-content">
                                {solutionLabel && (
                                    <div className="solution-label">
                                        {solutionLabel}
                                    </div>
                                )}

                                {solutionTitle && (
                                    <h2 className="solution-title">
                                        {solutionTitle}
                                    </h2>
                                )}

                                {solutionParagraphs.map((para, idx) => (
                                    <p className="solution-text" key={idx}>
                                        {para}
                                    </p>
                                ))}

                                {solutionPoints.length > 0 && (
                                    <ul
                                        className="case-content-list"
                                        style={{
                                            marginTop: "18px",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        {solutionPoints.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>
                                )}

                                {solutionTags.length > 0 && (
                                    <div className="solution-tags">
                                        {solutionTags.map((tag, idx) => (
                                            <span key={idx}>{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default CaseIntroSection;