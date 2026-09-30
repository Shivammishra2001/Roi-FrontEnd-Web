"use client";

import { useEffect, useRef } from "react";



export default function MetricsSection({ currentCase }) {
  const metrics = currentCase?.metrics || [];
  const sectionRef = useRef(null);
  const counterRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const animateCounter = (element, metric) => {
      const target = metric.target;
      const decimal = metric.decimals || 0;
      const prefix = metric.prefix || "";
      const suffix = metric.suffix || "";

      const duration = 1800;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const currentValue = target * easeOut;

        element.textContent =
          prefix +
          currentValue.toFixed(decimal) +
          suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent =
            prefix +
            target.toFixed(decimal) +
            suffix;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            metrics.forEach((metric, index) => {
              const counter = counterRefs.current[index];

              if (counter) {
                animateCounter(counter, metric);
              }
            });

            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [metrics]);

  return (
    <section
      className="metrics-section "
      ref={sectionRef}
    >
       <div className="container">

       
      <div className="metrics-container">
        {metrics.map((metric, index) => (
          <div
            className="metric-item"
            key={index}
          >
            <span className="metric-line"></span>

            <div
              className="metric-number"
              ref={(element) => {
                counterRefs.current[index] = element;
              }}
            >
              {metric.prefix}
              {Number(0).toFixed(metric.decimals || 0)}
              {metric.suffix}
            </div>

            <div className="metric-label">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
       </div>
    </section>
  );
}