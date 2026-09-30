import React from "react";

export default function OutlinedMarquee() {
  const phrase = "ORGANIC - PAID - AI - ";
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