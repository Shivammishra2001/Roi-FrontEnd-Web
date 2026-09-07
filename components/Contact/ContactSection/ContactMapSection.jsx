"use client";

import { useEffect, useRef } from "react";
import "./RotatingGlobe.css";

const INDIA = {
  lat: 22.5,
  lon: 78.9,
};

export default function ContactMapSection() {
  const canvasRef = useRef(null);
  const indiaLabelRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let rotation = 0;
    const ROT_SPEED = 0.003;

    let width = 0;
    let height = 0;
    let radius = 0;
    let cx = 0;
    let cy = 0;
    let dpr = 1;

    /*
      --------------------------------------------------
      DOTTED WORLD MAP
      --------------------------------------------------
    */
    const rawLandDeg = [];

    function addRegion(lon1, lon2, lat1, lat2, step = 3) {
      for (let lat = lat1; lat <= lat2; lat += step) {
        for (let lon = lon1; lon <= lon2; lon += step) {
          const wave =
            Math.sin(lon * 0.18) *
            Math.cos(lat * 0.13);

          if (wave > -0.25) {
            rawLandDeg.push([lon, lat]);
          }
        }
      }
    }

    /* Continents */
    addRegion(-168, -55, 15, 72, 2.7); // North America
    addRegion(-82, -35, -55, 13, 2.7); // South America
    addRegion(-12, 45, 35, 72, 2.4);   // Europe
    addRegion(-18, 52, -35, 37, 2.5);  // Africa
    addRegion(35, 145, 5, 72, 2.5);    // Asia
    addRegion(68, 90, 7, 35, 1.7);     // India - extra dense
    addRegion(95, 145, -10, 25, 2.5);  // South East Asia
    addRegion(112, 154, -44, -10, 2.5);// Australia
    addRegion(-73, -18, 58, 82, 2.5);  // Greenland
    addRegion(130, 146, 30, 45, 1.8);  // Japan / East Asia

    const gridPoints = rawLandDeg.map(([lon, lat]) => [
      (lon * Math.PI) / 180,
      (lat * Math.PI) / 180,
    ]);

    /*
      --------------------------------------------------
      RESIZE
      --------------------------------------------------
    */
    function resize() {
      dpr = window.devicePixelRatio || 1;

      const maxAllowed = Math.min(window.innerWidth * 0.9, 660);
      const size = Math.min(maxAllowed, window.innerHeight * 0.85);

      width = size;
      height = size;

      canvas.width = size * dpr;
      canvas.height = size * dpr;

      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cx = width / 2;
      cy = height / 2;

      radius = 0.38 * Math.min(width, height);
    }

    /*
      --------------------------------------------------
      PROJECT 3D POINT
      --------------------------------------------------
    */
    function projectPoint(lonDeg, latDeg) {
      const lon = (lonDeg * Math.PI) / 180;
      const lat = (latDeg * Math.PI) / 180;

      const a = lon + rotation;

      const x = radius * Math.cos(lat) * Math.sin(a);
      const z = radius * Math.cos(lat) * Math.cos(a);
      const y = radius * Math.sin(lat);

      return {
        x,
        y,
        z,
        visible: z > -0.04 * radius,
      };
    }

    /*
      --------------------------------------------------
      INDIA POSITION
      --------------------------------------------------
    */
    function updateIndiaLabel() {
      const label = indiaLabelRef.current;
      if (!label) return;

      const point = projectPoint(INDIA.lon, INDIA.lat);

      if (!point.visible) {
        label.style.opacity = "0";
        return;
      }

      label.style.opacity = "1";

      const x = cx + point.x;
      const y = cy - point.y;

      const labelX = x + 18;
      const labelY = y - 55;

      label.style.left = `${labelX}px`;
      label.style.top = `${labelY}px`;

      label.style.setProperty("--india-x", `${x}px`);
      label.style.setProperty("--india-y", `${y}px`);
    }

    /*
      --------------------------------------------------
      DRAW GLOBE
      --------------------------------------------------
    */
    function draw() {
      ctx.clearRect(0, 0, width, height);

      /* Outer globe */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 140, 255, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      /* Inner blue haze */
      const haze = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.45,
        cx,
        cy,
        radius
      );
      haze.addColorStop(0, "rgba(0, 30, 80, 0)");
      haze.addColorStop(1, "rgba(0, 120, 255, 0.15)");
      ctx.fillStyle = haze;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      /* Orbit ring */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.25);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.14, radius * 1.12, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 180, 255, 0.32)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      /* Orbit nodes */
      const numNodes = 6;
      for (let i = 0; i < numNodes; i++) {
        const angle = rotation * 1.8 + (i * Math.PI * 2) / numNodes;
        const sx = Math.cos(angle) * radius * 1.14;
        const sy = Math.sin(angle) * radius * 1.12;

        ctx.beginPath();
        ctx.arc(sx, sy, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(140, 235, 255, 0.95)";
        ctx.shadowColor = "rgba(0, 210, 255, 1)";
        ctx.shadowBlur = 12;
        ctx.fill();
      }
      ctx.restore();

      /* Project World Dots */
      const projected = [];
      for (let i = 0; i < gridPoints.length; i++) {
        const [lon, lat] = gridPoints[i];
        const a = lon + rotation;

        const x = radius * Math.cos(lat) * Math.sin(a);
        const z = radius * Math.cos(lat) * Math.cos(a);
        const y = radius * Math.sin(lat);

        if (z > -0.04 * radius) {
          projected.push([x, y, z]);
        }
      }

      projected.sort((a, b) => a[2] - b[2]);

      /* Draw World Dots */
      for (let i = 0; i < projected.length; i++) {
        const [x, y, z] = projected[i];
        const depth = (z + radius) / (2 * radius);
        const alpha = 0.18 + 0.82 * depth;
        const dotRadius = 0.7 + 1.4 * depth;

        const px = cx + x;
        const py = cy - y;

        ctx.beginPath();
        ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 184, 255, ${alpha.toFixed(2)})`;
        ctx.fill();
      }

      /* India Marker */
      const india = projectPoint(INDIA.lon, INDIA.lat);

      if (india.visible) {
        const ix = cx + india.x;
        const iy = cy - india.y;

        /* Glow */
        ctx.save();
        ctx.beginPath();
        ctx.arc(ix, iy, 12, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 180, 255, 0.08)";
        ctx.shadowColor = "rgba(0, 200, 255, 1)";
        ctx.shadowBlur = 18;
        ctx.fill();

        /* Main marker */
        ctx.beginPath();
        ctx.arc(ix, iy, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#00b8ff";
        ctx.shadowColor = "#00d9ff";
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.restore();

        /* Connector line */
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(ix, iy);
        ctx.lineTo(ix + 22, iy - 25);
        ctx.strokeStyle = "rgba(0, 190, 255, 0.7)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      /* Update floating card */
      updateIndiaLabel();

      /* Rotate */
      rotation += ROT_SPEED;
      animationRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="globe-section">
      <div className="globe-ambient-glow" aria-hidden="true" />
      <div className="globe-header">
        <div className="globe-badge">
          <span className="globe-badge-dot" />
          <span>GLOBAL PRESENCE</span>
        </div>
        <h2 className="globe-title">
          OFFICES ACROSS <span className="accent-yellow">THE GLOBE</span>
        </h2>
      </div>

      <div className="globe-wrapper">
        <canvas ref={canvasRef} className="globe-canvas" />

        {/* INDIA LOCATION CARD */}
        <div ref={indiaLabelRef} className="india-location">
          <div className="india-location-inner">
            <div className="india-flag">🇮🇳</div>
            <div className="india-content">
              <span className="india-country">India</span>
              <span className="india-cities">Gurgaon, Jaipur, Mumbai</span>
            </div>
          </div>

          {/* Blue dotted decoration */}
          <div className="location-dots">
            {Array.from({ length: 35 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}