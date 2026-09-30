// Per-position modifier classes carry each card's colour treatment in
// HomeCss.css; cards beyond the third reuse them in order.
const PILLAR_CLASSES = ['three-pillars-one', 'three-pillars-pillar-two', 'three-pillars-pillar-three'];

export default function ThreePillarsSection({ backgroundImage, pillars = [] }) {
    const backgroundStyle = backgroundImage?.url ? { backgroundImage: `url("${backgroundImage.url}")` } : undefined;

    return (
        <>
            <section id="capabilities" className="three-pillars-section-area">
                {pillars.map((pillar, index) => (
                    <div
                        key={index}
                        className={`three-pillars-stack-card ${PILLAR_CLASSES[index % PILLAR_CLASSES.length]}`}
                        style={backgroundStyle}
                    >
                        <div className="srcn-container">
                            <div className="pillar-container-warpper">
                                <div className="three-pillars-row">
                                    <div className="three-pillars-number-box">
                                        <div className="three-pillars-number">{pillar.number}</div>
                                    </div>
                                    <div className="three-pillars-content">
                                        <div className="three-pillars-tag">{pillar.tag}</div>
                                        <h3 className="three-pillars-title">{pillar.title}</h3>
                                        <div className="three-pillars-body">
                                            <ul className="three-pillars-list">
                                                {(pillar.listItems || []).map((item, itemIndex) => (
                                                    <li className="three-pillars-itme" key={itemIndex}>
                                                        <a
                                                            href={item.href}
                                                            className="three-pillars-link"
                                                            {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                                        >
                                                            {item.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
