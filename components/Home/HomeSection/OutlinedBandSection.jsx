import React from "react";
import { text } from "../../../lib/cms";

export default function OutlinedMarquee({ data = {} }) {
  const phrase = text(data.marqueePhrase, "ORGANIC - PAID - AI - ");
  const repeated = phrase.repeat(15);

  return (
    <section className="outlined-marquee">
      <div className="marquee-track">
        <div className="marquee-text">{repeated}</div>
        <div className="marquee-text">{repeated}</div>
      </div>
    </section>
  );
}
