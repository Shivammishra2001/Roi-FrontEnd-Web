"use client";

const CaseNumberSection = () => {
  return (
    <section className="blog-number-section">
      <div className="container">
        <div className="blog-number-inner">

          <div className="blog-number-content">
            <div className="blog-number-label">
              <span className="arr"><i className="fa fa-long-arrow-right"></i> </span>
                 Digital Discovery
            </div>

            <h2 className="blog-number-title">
              From Being Searched to Being Chosen
            </h2>

            <p className="blog-number-description">
              Turning digital visibility into meaningful engagement, trust,
              and action.
            </p>
          </div>

          <div className="blog-number-btm-area">
            <a
              href="#contact"
              className="blog-number-button work-button "
            >
              <span>Start a conversation</span>

              <span className="arr"><i className="fa fa-long-arrow-right"></i></span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseNumberSection;