"use client";

import { useState } from "react";
import Link from "next/link";
import { caseStudies } from "../data/caseStudiesData";

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

const ITEMS_PER_PAGE = 6;

export default function CaseStudieCardSection() {
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
                {currentBlogs.map((blog) => (
                  <article
                    className="blog-card-col show"
                    data-category={blog.category}
                    key={blog.id}
                  >
                    <div className="blog-card-area">
                      <Link href={`/case-studies/${blog.slug}`} className="work-image" style={{ display: 'block' }}>
                        <img src={blog.image} alt={blog.alt} />
                      </Link>
                      <div className="work-content">
                        <div className="work-meta">
                          <div className="card-sector-subitel">
                            {blog.sector}
                          </div>
                        </div>
                        <div className="blog-contnet-area">
                          <h2 className="work-title">
                            <Link href={`/case-studies/${blog.slug}`}>
                              {blog.title}
                            </Link>
                          </h2>
                        </div>
                        <div className="blog-contnet-btn-area">
                          <Link href={`/case-studies/${blog.slug}`} className="work-button">
                            <span>View Case Study</span>
                            <span className="button-arrow"><i className="fa fa-long-arrow-right"></i></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
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