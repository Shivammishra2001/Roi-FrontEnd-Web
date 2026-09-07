import React from "react";

export default function OutlinedMarquee({ marqueePhrase }) {
  const repeated = marqueePhrase.repeat(15);

  return (
    <section className="outlined-marquee">
      <div className="marquee-track">
        <div className="marquee-text">{repeated}</div>
        <div className="marquee-text">{repeated}</div>
      </div>
    </section>
  );
}
