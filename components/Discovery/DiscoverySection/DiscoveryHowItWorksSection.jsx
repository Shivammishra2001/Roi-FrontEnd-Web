
"use client";

import { useEffect, useRef, useState } from "react";
import { text, list } from "@/lib/cms";

const DEFAULT_STEPS = [
  {
    number: "01",
    title: "Business Outcomes",
    description: "Every program starts here. Pipeline, revenue, category share, cost per acquisition. The outcome decides what we research, what we create, and where we distribute.",
  },
  {
    number: "02",
    title: "Research",
    description: "Keywords, buyer questions, Reel topics, Reddit threads, competitor gaps, AI prompt coverage. Not three research exercises for three teams — one map that feeds everything downstream.",
  },
  {
    number: "03",
    title: "Content Creation",
    description: "Long-form video. Written assets. Short-form social. PR angles. Each piece designed to be chopped, repurposed, and routed to the surfaces where buyers are looking.",
  },
  {
    number: "04",
    title: "Distribution",
    description: "SEO. Digital PR. YouTube. Reels. LinkedIn. Reddit. GMB. Wikipedia. Each surface fed with the asset built for it, not a copy-paste from somewhere else.",
  },
  {
    number: "05",
    title: "Visibility",
    description: "Rank on search. Cited in AI answers. Pulled into reviews. Surfaced in feeds. The outcome of distribution done right — the brand showing up wherever a buyer is looking, over and over.",
  },
];

// Strapi `sections.discovery-how-it-works`; blank fields fall back to the built-in copy.
export default function HowItWorksPage({ eyebrow, heading, steps, resultText, resultHighlight }) {
  const sectionRef = useRef(null);
  const stepsData = list(steps, DEFAULT_STEPS);
  const stepCount = stepsData.length;

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let ticking = false;

    const updateFromScroll = () => {
      const rect = section.getBoundingClientRect();

      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollDistance = sectionHeight - viewportHeight;

      if (scrollDistance <= 0) return;

      let progressValue =
        -rect.top / scrollDistance;

      progressValue = Math.max(
        0,
        Math.min(1, progressValue)
      );

      const stepProgress =
        progressValue *
        (stepCount + 0.2);

      let index = Math.floor(stepProgress);

      index = Math.max(
        0,
        Math.min(
          stepCount - 1,
          index
        )
      );

      setCurrentStep(index);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateFromScroll();
          ticking = false;
        });

        ticking = true;
      }
    };

    const handleResize = () => {
      updateFromScroll();
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    updateFromScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [stepCount]);

  const scrollToStep = (index) => {
    const section = sectionRef.current;

    if (!section) return;

    const rect =
      section.getBoundingClientRect();

    const sectionTop =
      rect.top + window.scrollY;

    const scrollDistance =
      section.offsetHeight -
      window.innerHeight;

    const targetProgress =
      (index + 0.5) /
      (stepCount + 0.2);

    const targetY =
      sectionTop +
      targetProgress * scrollDistance;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section id="discovery-how" ref={sectionRef} className="discovery-how-section">
        <div className="discovery-how-sticky">
                      <div className="srcn-container">
          <div className="discovery-how-container">
            <div className="discovery-how-intro">
              <div className="case-kicker discovery-how-label"><span className="arr"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>   {text(eyebrow, "How It Works")}</div>
              <h2 className="discovery-how-heading">
                {text(heading, "Five layers. One connected system.")}
              </h2>
              <div className="discovery-how-progress" id="discoveryHowProgress" >
                {stepsData.map(
                  (_, index) => (
                    <span
                      key={index}
                      className={`discovery-how-progress-item ${
                        index <= currentStep
                          ? "is-active"
                          : ""
                      }`}
                    />
                  )
                )}
              </div>
              <p
                className={`discovery-how-result ${
                  currentStep ===
                  stepCount - 1
                    ? "is-visible"
                    : ""
                }`}
              >
                {text(resultText, "Then back to outcomes.")}{" "}
                <span>
                  {text(resultHighlight, "Measure. Learn. Compound.")}
                </span>
              </p>

            </div>
            <div className="discovery-how-steps" id="discoveryHowSteps">
              {stepsData.map(
                (step, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`discovery-how-step ${
                      index <= currentStep
                        ? "is-available"
                        : ""
                    } ${
                      index === currentStep
                        ? "is-current"
                        : ""
                    }`}
                    data-index={index}
                    onClick={() =>
                      scrollToStep(index)
                    }
                  >
                    <div className="discovery-how-step-header">
                        <span className="discovery-how-step-number"> {step.number}</span>
                      <h3 className="discovery-how-step-title">{step.title}</h3>
                    </div>
                    <div className="discovery-how-step-expand">
                      <div className="discovery-how-step-inner">
                        <p className="discovery-how-step-text">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
