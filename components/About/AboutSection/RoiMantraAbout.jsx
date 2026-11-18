"use client";

import React from "react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function RoiMantraAbout() {
  const [ref, on] = useInView(0.15);

  return (
    <section ref={ref} className="manifesto-section-area">
      <div className="srcn-container">
        <div className="manifesto-section-content-area">
          <p className="manifesto-stmt">
            We are not just marketers. We are builders of behaviour. Shaping systems
            that bend decisions, long before anyone types your name.{" "}
            <span className="manifesto-acc">Discovery is the foundation.</span> Transformation
            is the fire.
          </p>

          <div className="manifesto-sub2">
            <div className="manifesto-ctas">
              <Link className="manifesto-btn" href="/case-studies">
                The Work
                <span className="manifesto-arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>
              </Link>
              <Link className="manifesto-btn ghost" href="/blog">
                The Thinking
                <span className="manifesto-arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>
              </Link>
            </div>
            <div className="manifesto-note">
              <b>Discovery comes first.</b>
              <p>
                Strategy gives shape to intent. Discovery turns that intent into
                systems a buyer runs into on every surface. Behaviour is the
                foundation of every brand built to grow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
