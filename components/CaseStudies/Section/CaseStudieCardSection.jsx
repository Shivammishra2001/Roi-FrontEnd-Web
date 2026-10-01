"use client";

import { useState } from "react";
import Link from "next/link";

const filters = [
  {
    label: "ALL",
    value: "all",
  },
  {
    label: "HOSPITALITY",
    value: "hospitality",
  },
  {
    label: "HEALTHCARE",
    value: "healthcare",
  },
  {
    label: "REAL ESTATE",
    value: "real-estate",
  },
  {
    label: "B2B",
    value: "other",
  },
];

const ITEMS_PER_PAGE = 8;

// `caseStudies`: published case studies from Strapi, mapped by lib/caseStudies.js.
export default function CaseStudieCardSection({ caseStudies = [] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBlogs =
    activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((blog) => blog.category === activeFilter);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <>
      <main className="blog-section-main">
        <section className="blog-section-area">
          <div className="container">
            <div className="work-filters">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className={`filter-btn ${
                    activeFilter === filter.value ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            {currentBlogs.length > 0 ? (
              <div className="blog-card-grid">
                {currentBlogs.map((blog) => {
                  const metric1 = blog.cardMetrics?.[0] || {
                    value: blog.impactMetrics?.[0]?.value || "+00%",
                    label: blog.impactMetrics?.[0]?.label || "Metric One",
                  };
                  const metric2 = blog.cardMetrics?.[1] || {
                    value: blog.impactMetrics?.[1]?.value || "+00%",
                    label: blog.impactMetrics?.[1]?.label || "Metric Two",
                  };
                  const category =
                    blog.cardCategory || blog.servicesSummary || blog.sector || "SEO STRATEGY";
                  const client = blog.cardTitle || blog.client || blog.title;
                  const heading = blog.title;

                  return (
                    <article
                      className="blog-card-col show"
                      data-category={blog.category}
                      key={blog.id}
                    >
                      <div className="blog-card-area case-study-card-with-header">
                        {/* Card Header: Image with Gradient Overlay & Metrics */}
                        <Link
                          href={`/case-studies/${blog.slug}`}
                          className="case-card-header"
                        >
                          <div className="case-card-image">
                            <img src={blog.image} alt={blog.alt || client} />
                            <div className="case-card-gradient-overlay" />
                          </div>

                          <div className="case-card-overlay-content">
                            <div className="case-card-top-meta">
                              <span className="case-card-kicker">{category}</span>
                              <div className="case-card-client-title">{client}</div>
                            </div>

                            <div className="case-card-metrics-row">
                              <div className="case-card-metric-col">
                                <span className="case-card-metric-val">
                                  {metric1.value}
                                </span>
                                <span className="case-card-metric-lbl">
                                  {metric1.label}
                                </span>
                              </div>
                              <div className="case-card-metric-col">
                                <span className="case-card-metric-val">
                                  {metric2.value}
                                </span>
                                <span className="case-card-metric-lbl">
                                  {metric2.label}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>

                        {/* Card Body: Heading & View Button */}
                        <div className="work-content">
                          <div className="blog-contnet-area">
                            <h2 className="work-title">
                              <Link href={`/case-studies/${blog.slug}`}>
                                {heading}
                              </Link>
                            </h2>
                          </div>
                          <div className="blog-contnet-btn-area">
                            <Link
                              href={`/case-studies/${blog.slug}`}
                              className="work-button"
                            >
                              <span>View Case Study</span>
                              <span className="button-arrow">
                                <i className="fa fa-long-arrow-right"></i>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="no-blog-message show" id="noBlogMessage">
                <div className="no-blog-icon"><i className="fa fa-long-arrow-right"></i></div>
                <h3>No case studies found</h3>
                <p>There are no case studies available in this category.</p>
              </div>
            )}
            {totalPages > 1 && (
              <div className="pagination show" id="pagination" style={{ display: "flex" }}>
                <button
                  type="button"
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                 <i className="fa fa-long-arrow-left"></i>
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={`page-btn ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                >
                  <i className="fa fa-long-arrow-right"></i>
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

    </>
  );
}