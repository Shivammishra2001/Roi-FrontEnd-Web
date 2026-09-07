import Image from 'next/image';

export default function PartnerSection({ sectionAriaLabel, partnerLogos }) {
    return (
        <section className="partner-section-area" aria-label={sectionAriaLabel}>
            <div className="partner-logo-area">
                <div className="partner-logo-grid">
                    <div className="partner-logo-track">
                        {[0, 1].map((groupIndex) => (
                            <div className="partner-logo-set" key={groupIndex} aria-hidden={groupIndex === 1}>
                                {partnerLogos.map((logo) => (
                                    <div className="partner-col" key={`${logo.alt}-${groupIndex}`}>
                                        <div className="partner-logo-img">
                                            <span className="partner-logo">
                                                <Image
                                                    src={logo.url}
                                                    alt={groupIndex === 0 ? logo.alt : ''}
                                                    width={logo.width}
                                                    height={logo.height}
                                                    sizes="160px"
                                                    priority={groupIndex === 0}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
