import Image from 'next/image';

const partnerLogos = [
    { src: '/images/max-logo.png', alt: 'Max' },
    { src: '/images/easemytrip-logo.png', alt: 'EaseMyTrip' },
    { src: '/images/pvr-logo.png', alt: 'PVR' },
    { src: '/images/jkcement-logo.png', alt: 'JK Cement' },
    { src: '/images/emaar-logo.png', alt: 'Emaar' },
    { src: '/images/nikon-logo.png', alt: 'Nikon' },
];

export default function PartnerSection() {
    return (
        <section className="partner-section-area" aria-label="Trusted partner brands">
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
                                                    src={logo.src}
                                                    alt={groupIndex === 0 ? logo.alt : ''}
                                                    width={160}
                                                    height={64}
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
