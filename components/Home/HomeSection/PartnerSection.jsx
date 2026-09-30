import Image from 'next/image';

export default function PartnerSection({ sectionAriaLabel, partnerLogos = [] }) {
    const logos = partnerLogos.filter((logo) => logo?.url);

    return (
        <section className="partner-section-area" aria-label={sectionAriaLabel || undefined}>
            <div className="partner-logo-area">
                <div className="partner-logo-grid">
                    <div className="partner-logo-track">
                        {[0, 1].map((groupIndex) => (
                            <div className="partner-logo-set" key={groupIndex} aria-hidden={groupIndex === 1}>
                                {logos.map((logo, index) => (
                                    <div className="partner-col" key={`${index}-${groupIndex}`}>
                                        <div className="partner-logo-img">
                                            <span className="partner-logo">
                                                <Image
                                                    src={logo.url}
                                                    alt={groupIndex === 0 ? logo.alt : ''}
                                                    width={logo.width || 160}
                                                    height={logo.height || 64}
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
