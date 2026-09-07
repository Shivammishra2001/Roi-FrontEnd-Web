export default function ThreePillarsSection({ pillars }) {
    const [pillarOne, pillarTwo, pillarThree] = pillars;
    return (
        <>
            <section id="capabilities" className="three-pillars-section-area">
                <div className="three-pillars-stack-card three-pillars-one">
                    <div className="srcn-container">
                        <div className="pillar-container-warpper">
                            <div className="three-pillars-row">
                                <div className="three-pillars-number-box">
                                    <div className="three-pillars-number">{pillarOne.number}</div>
                                </div>
                                <div className="three-pillars-content">
                                    <div className="three-pillars-tag">{pillarOne.tag}</div>
                                    <h3 className="three-pillars-title">{pillarOne.title}</h3>
                                    <div className="three-pillars-body">
                                        <ul className="three-pillars-list">
                                            {pillarOne.listItems.map((item, i) => (
                                                <li className="three-pillars-itme" key={i}><a href={item.href} className="three-pillars-link">{item.label}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="three-pillars-stack-card three-pillars-pillar-two">
                    <div className="srcn-container">
                        <div className="pillar-container-warpper">
                            <div className="three-pillars-row">
                                <div className="three-pillars-number-box">
                                    <div className="three-pillars-number">{pillarTwo.number}</div>
                                </div>
                                <div className="three-pillars-content">
                                    <div className="three-pillars-tag">{pillarTwo.tag}</div>
                                    <h3 className="three-pillars-title">{pillarTwo.title}</h3>

                                     <div className="three-pillars-body">
                                        <ul className="three-pillars-list">
                                            {pillarTwo.listItems.map((item, i) => (
                                                <li className="three-pillars-itme" key={i}><a href={item.href} className="three-pillars-link">{item.label}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="three-pillars-stack-card three-pillars-pillar-three">
                    <div className="srcn-container">
                        <div className="pillar-container-warpper">
                            <div className="three-pillars-row">
                                <div className="three-pillars-number-box">
                                    <div className="three-pillars-number">{pillarThree.number}</div>
                                </div>
                                <div className="three-pillars-content">
                                    <div className="three-pillars-tag">{pillarThree.tag}</div>
                                    <h3 className="three-pillars-title">{pillarThree.title}</h3>

                                    <div className="three-pillars-body">
                                        <ul className="three-pillars-list">
                                            {pillarThree.listItems.map((item, i) => (
                                                <li className="three-pillars-itme" key={i}><a href={item.href} className="three-pillars-link">{item.label}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
