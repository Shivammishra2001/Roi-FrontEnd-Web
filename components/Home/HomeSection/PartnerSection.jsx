import Image from 'next/image';
import { text, list, mediaUrl, mediaAlt } from '../../../lib/cms';

const DEFAULT_LOGOS = [
    { url: '/images/max-logo.png', alt: 'Max' },
    { url: '/images/easemytrip-logo.png', alt: 'EaseMyTrip' },
    { url: '/images/pvr-logo.png', alt: 'PVR' },
    { url: '/images/jkcement-logo.png', alt: 'JK Cement' },
    { url: '/images/emaar-logo.png', alt: 'Emaar' },
    { url: '/images/nikon-logo.png', alt: 'Nikon' },
];

export default function PartnerSection({ data = {} }) {
    const ariaLabel = text(data.sectionAriaLabel, 'Trusted partner brands');
    const partnerLogos = list(data.partnerLogos, DEFAULT_LOGOS).filter((logo) => mediaUrl(logo));

    return (
        <section className="partner-section-area" aria-label={ariaLabel}>
            <div className="partner-logo-area">
                <div className="partner-logo-grid">
                    <div className="partner-logo-track">
                        {[0, 1].map((groupIndex) => (
                            <div className="partner-logo-set" key={groupIndex} aria-hidden={groupIndex === 1}>
                                {partnerLogos.map((logo, i) => (
                                    <div className="partner-col" key={`${mediaUrl(logo)}-${i}-${groupIndex}`}>
                                        <div className="partner-logo-img">
                                            <span className="partner-logo">
                                                <Image
                                                    src={mediaUrl(logo)}
                                                    alt={groupIndex === 0 ? mediaAlt(logo) : ''}
                                                    width={160}
                                                    height={64}
                                                    sizes="160px"
                                                    priority={groupIndex === 0}
                                                    unoptimized={mediaUrl(logo).startsWith('/uploads/')}
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
