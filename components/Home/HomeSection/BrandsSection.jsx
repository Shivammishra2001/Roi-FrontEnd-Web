"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import useNearViewport from "../../useNearViewport";

/**
 * A brand's optional link from Strapi, or null. Only site paths, #anchors,
 * http(s), mailto: and tel: links are used (anything else, e.g.
 * "javascript:", is ignored); "www.example.com" gets https:// added.
 */
function brandHref(link) {
    const href = typeof link === "string" ? link.trim() : "";
    if (/^www\./i.test(href)) return `https://${href}`;
    return /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(href) ? href : null;
}

export default function BrandsSection({ headingPrefix, headingEmphasis, brandTiles = [] }) {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    // Tile photos are fetched only when the section is about to be seen.
    const photosNear = useNearViewport(sectionRef, "600px");

    const [trackOffset, setTrackOffset] = useState(0);
    const [tilt, setTilt] = useState(1);

    const TILES = brandTiles
        .filter((tile) => tile.photo?.url)
        .map((tile) => {
            // A linked case study wins; otherwise the Link field; neither = not clickable.
            const caseStudySlug = tile.caseStudy?.slug;
            const href = caseStudySlug ? `/case-studies/${encodeURIComponent(caseStudySlug)}` : brandHref(tile.link);
            const name = tile.name || tile.photo.alt || "Brand";
            return {
                image: tile.photo.url,
                name: caseStudySlug ? `${name} case study` : name,
                href,
                // External sites always open in a new tab.
                newTab: !caseStudySlug && !!href && (!!tile.isExternal || /^https?:\/\//i.test(href)),
            };
        });

    const tileStyle = (t, i) => ({
        backgroundImage: photosNear ? `url(${t.image})` : undefined,
        transform: `rotateZ(${(i % 2 === 0 ? 1 : -1) * 3 * tilt}deg)`,
    });

    useEffect(() => {
        const sec = sectionRef.current;
        const tr = trackRef.current;

        if (!sec || !tr) return;

        const compute = () => {
            const r = sec.getBoundingClientRect();

            const total = r.height - window.innerHeight;

            if (total <= 0) return;

            const p = Math.max(
                0,
                Math.min(1, -r.top / total)
            );

            const trackWidth = tr.scrollWidth;
            const viewW = window.innerWidth;

            const maxX = Math.max(
                0,
                trackWidth - viewW + 80
            );

            setTrackOffset(p * maxX);

            setTilt(
                Math.max(
                    0,
                    1 - p * 1.6
                )
            );
        };

        window.addEventListener(
            "scroll",
            compute,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            compute
        );

        compute();

        return () => {
            window.removeEventListener(
                "scroll",
                compute
            );

            window.removeEventListener(
                "resize",
                compute
            );
        };
    }, []);

    return (
        <section
            id="work"
            ref={sectionRef}
            className="pin-section brands-pin-section bg-paper"
        >
            <div className="pin-stage">

                <div className="srcn-container">

                    <div className="work-header">
                        <h2 className="common-top-heading page-title">
                            {headingPrefix}{" "}
                            <span>{headingEmphasis}</span>
                        </h2>
                    </div>

                    <div className="tilt-stage user-items-list">

                        <div
                            className="tilt-row"
                            style={{
                                transform: `
                                    rotateX(${12 * tilt}deg)
                                    rotateY(${-6 * tilt}deg)
                                `,
                                transition:
                                    "transform 400ms cubic-bezier(.2,.7,.2,1)",
                            }}
                        >

                            <div
                                ref={trackRef}
                                className="work-track"
                                style={{
                                    transform: `translateX(-${trackOffset}px)`,
                                    willChange: "transform",
                                }}
                            >

                                {TILES.map((t, i) => {
                                    // No link: the plain image, as before.
                                    if (!t.href) {
                                        return <div key={i} className="work-tile" style={tileStyle(t, i)} />;
                                    }
                                    if (t.newTab) {
                                        return (
                                            <a
                                                key={i}
                                                href={t.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="work-tile work-tile--link"
                                                style={tileStyle(t, i)}
                                                aria-label={`${t.name} (opens in a new tab)`}
                                            />
                                        );
                                    }
                                    return (
                                        <Link
                                            key={i}
                                            href={t.href}
                                            className="work-tile work-tile--link"
                                            style={tileStyle(t, i)}
                                            aria-label={t.name}
                                        />
                                    );
                                })}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}