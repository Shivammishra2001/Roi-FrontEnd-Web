import CmsLink from '../../common/CmsLink';
import { text, list, href, mediaUrl } from '../../../lib/cms';

const item = (label) => ({ label, href: '#' });

const DEFAULT_PILLARS = [
    {
        number: '01',
        tag: '01 / Organic Discovery',
        title: 'Show up where buyers go looking.',
        listItems: ['Search engines', 'Marketplaces', 'Reddit', 'Wikipedia', 'LinkedIn', 'App stores', 'Knowledge graphs'].map(item),
    },
    {
        number: '02',
        tag: '02 / Paid Discovery',
        title: 'Meet intent at the right moment.',
        listItems: [' Google', 'Meta', 'programmatic', 'YouTube', 'Snap', 'Retargeting', 'Every rupee tied to outcome'].map(item),
    },
    {
        number: '03',
        tag: '03 / AI Discovery',
        title: 'Be the answer when buyers ask the machine.',
        listItems: [' ChatGPT', 'Perplexity', 'Gemini', 'AI Overviews', 'Claude', 'Built to be cited'].map(item),
    },
];

// Per-card colour classes from HomeCss.css; cards past the third reuse them.
const CARD_CLASSES = ['three-pillars-one', 'three-pillars-pillar-two', 'three-pillars-pillar-three'];

export default function ThreePillarsSection({ data = {} }) {
    const pillars = list(data.pillars, DEFAULT_PILLARS).filter(Boolean);
    // Without a CMS image the CSS default (/images/three-pillars-banner.jpg) applies.
    const background = mediaUrl(data.backgroundImage);
    const cardStyle = background ? { backgroundImage: `url("${background}")` } : undefined;

    return (
        <>
            <section id="capabilities" className="three-pillars-section-area">
                {pillars.map((pillar, i) => {
                    const fallback = DEFAULT_PILLARS[i] || {};
                    const items = list(pillar.listItems, fallback.listItems || []).filter((li) => li && text(li.label));
                    return (
                        <div
                            key={`${pillar.number}-${i}`}
                            className={`three-pillars-stack-card ${CARD_CLASSES[i % CARD_CLASSES.length]}`}
                            style={cardStyle}
                        >
                            <div className="srcn-container">
                                <div className="pillar-container-warpper">
                                    <div className="three-pillars-row">
                                        <div className="three-pillars-number-box">
                                            <div className="three-pillars-number">{text(pillar.number, fallback.number || String(i + 1).padStart(2, '0'))}</div>
                                        </div>
                                        <div className="three-pillars-content">
                                            <div className="three-pillars-tag">{text(pillar.tag, fallback.tag)}</div>
                                            <h3 className="three-pillars-title">{text(pillar.title, fallback.title)}</h3>
                                            <div className="three-pillars-body">
                                                <ul className="three-pillars-list">
                                                    {items.map((li, j) => (
                                                        <li className="three-pillars-itme" key={`${li.label}-${j}`}>
                                                            <CmsLink
                                                                href={href(li.href)}
                                                                isExternal={li.isExternal}
                                                                aria-label={li.ariaLabel || undefined}
                                                                className="three-pillars-link"
                                                            >
                                                                {li.label}
                                                            </CmsLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    );
}
