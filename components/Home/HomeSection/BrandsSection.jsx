"use client";

import React, { useRef, useEffect, useState } from "react";
import { text, list, mediaUrl, mediaAlt } from "../../../lib/cms";

const DEFAULT_TILES = [
    { image: "/images/Ease-mt-trip.jpg" },
    { image: "/images/PVR-05.jpg" },
    { image: "/images/MAX01.jpg" },
    { image: "/images/whirlpoo02.jpg" },
    { image: "/images/greenlam2.jpg" },
    { image: "/images/whirlpooL01.jpg" },
    { image: "/images/emmar.jpg" },
    { image: "/images/County.jpg" },
    { image: "/images/ZIVAME.jpg" },
];

export default function BrandsSection({ data = {} }) {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    const [trackOffset, setTrackOffset] = useState(0);
    const [tilt, setTilt] = useState(1);

    const TILES = list(data.brandTiles, DEFAULT_TILES)
        .map((t) => ({ image: mediaUrl(t.photo || t.image), name: text(t.name, mediaAlt(t.photo)) }))
        .filter((t) => t.image);
    const headingPrefix = text(data.headingPrefix, "Fourteen Brands One ");
    const headingEmphasis = text(data.headingEmphasis, "Playbook.");

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
            className="pin-section bg-paper"
            style={{
                height: "380vh",
            }}
        >
            <div className="pin-stage">

                <div className="srcn-container">

                    <div className="work-header">
                        <h2 className="common-top-heading page-title">
                            {headingPrefix.trimEnd()}{" "}
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

                                {TILES.map((t, i) => (
                                    <div
                                        key={i}
                                        className="work-tile"
                                        role={t.name ? "img" : undefined}
                                        aria-label={t.name || undefined}
                                        style={{
                                            backgroundImage: `url("${t.image}")`,
                                            transform: `
                                                rotateZ(
                                                    ${
                                                        (i % 2 === 0
                                                            ? 1
                                                            : -1) *
                                                        3 *
                                                        tilt
                                                    }deg
                                                )
                                            `,
                                        }}
                                    />
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}