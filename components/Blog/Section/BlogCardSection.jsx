"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { blogCategoryName, blogImageUrl, blogMatchesFilter } from "../../../lib/format";


export default function BlogCardSection({
  filters = [],
  itemsPerPage,
  cardButtonLabel,
  emptyTitle,
  emptyText,
  posts = [],
}) {
  const blogs = posts;
  const ITEMS_PER_PAGE = itemsPerPage || 6;
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const cardGridRef = useRef(null);
  const previousPageRef = useRef(currentPage);

  useEffect(() => {
    if (previousPageRef.current === currentPage) {
      return;
    }
    previousPageRef.current = currentPage;
    cardGridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentPage]);

  // Tab matching is case/spacing/"&"-insensitive (lib/format.js).
  const activeTab = filters.find((filter) => filter.value === activeFilter) || { value: "all" };
  const filteredBlogs = blogs.filter((blog) => blogMatchesFilter(blog, activeTab));

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  // Sliding window: show at most 5 page buttons, centred on the current page.
  // <=5 pages → show all; otherwise clamp the window to [1, totalPages] so the
  // start and end never run past the real page range.
  const MAX_VISIBLE_PAGES = 5;
  let startPage;
  let endPage;
  if (totalPages <= MAX_VISIBLE_PAGES) {
    startPage = 1;
    endPage = totalPages;
  } else {
    startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    endPage = startPage + MAX_VISIBLE_PAGES - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - MAX_VISIBLE_PAGES + 1;
    }
  }
  const visiblePages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, index) => startPage + index
  );

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
              <div ref={cardGridRef} className="blog-card-grid">
                {currentBlogs.map((blog) => (
                  <article
                    className="blog-card-col show"
                    data-category={blog.categoryKey}
                    key={blog.id}
                  >
                    <div className="blog-card-area">
                      <Link href={`/blog/${blog.slug}`} className="work-image" style={{ display: 'block' }}>
                        <img src={blogImageUrl(blog)} alt={blog.image?.alt || blog.title} />
                      </Link>
                      <div className="work-content">
                        <div className="work-meta">
                          <div className="card-sector-subitel">
                            {blog.sector || blogCategoryName(blog)}
                          </div>
                        </div>
                        <div className="blog-contnet-area">
                          <h2 className="work-title">
                            <Link href={`/blog/${blog.slug}`}>
                              {blog.title}
                            </Link>
                          </h2>
                        </div>
                        <div className="blog-contnet-btn-area">
                          <Link href={`/blog/${blog.slug}`} className="work-button">
                            <span>{cardButtonLabel}</span>
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
                <h3>{emptyTitle}</h3>
                <p>{emptyText}</p>
              </div>
            )}
            {totalPages > 1 && (
              <div className="pagination show" id="pagination" style={{ display: "flex" }}>
                <button
                  type="button"
                  className="page-btn prev-btn"
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <i className="fa fa-long-arrow-left"></i>
                </button>
                {startPage > 1 && (
                  <button
                    type="button"
                    className="page-btn page-ellipsis"
                    aria-label="Previous pages"
                    onClick={() => setCurrentPage(startPage - 1)}
                  >
                    ...
                  </button>
                )}
                {visiblePages.map((page) => (
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
                {endPage < totalPages && (
                  <button
                    type="button"
                    className="page-btn page-ellipsis"
                    aria-label="Next pages"
                    onClick={() => setCurrentPage(endPage + 1)}
                  >
                    ...
                  </button>
                )}
                <button
                  type="button"
                  className="page-btn next-btn"
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
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