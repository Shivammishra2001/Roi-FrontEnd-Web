export default function ResultsSection({ kicker, title, results = [] }) {
    return (
        <>
            <section className="creative-future-section-area ">
                <div className="srcn-container">
                    <div className="common-wrapper-top-box">
                        <div className="common-row-aea">
                            <div className="common-top-header">
                                <div className="case-kicker"><span className="arr"><i className="fa fa-long-arrow-right"></i></span>  {kicker}</div>
                                <h2 className="case-content-title">
                                    {title}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="creative-future-wrapper-top-box">
                        <div className="creative-future-grid">
                            {results.map((result, index) => (
                                <div className="creative-future-col" key={index}>
                                    <div className="creative-future-card">
                                        <div className="creative-future-card-inner">
                                            <div className="creative-future-content">
                                                <div className="creative-future-number">
                                                    {result.number}
                                                </div>
                                                <h3 className="creative-future-title">
                                                    {result.title}
                                                </h3>
                                                <p className="creative-future-text">
                                                    {result.text}
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
