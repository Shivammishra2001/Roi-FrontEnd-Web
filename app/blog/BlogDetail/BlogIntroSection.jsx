"use client";
import { formatDate } from "../../../lib/format";

const BlogIntroSection = ({ currentBlog, dateLabel, categoryLabel }) => {
    const isHtml = currentBlog?.content && currentBlog.content.includes('<');

    const formattedContent = isHtml ? currentBlog.content
        .replace(/<h2(\s*|\s+[^>]*)>/gi, (match, p1) => {
            if (/case-content-title/i.test(match)) return match;
            if (/class=["']/i.test(match)) {
                return match.replace(/class=["']([^"']*)["']/i, 'class="$1 case-content-title"');
            }
            return `<h2 class="case-content-title"${p1 ? ' ' + p1.trim() : ''}>`;
        })
        .replace(/<h3(\s*|\s+[^>]*)>/gi, (match, p1) => {
            if (/case-content-title-h3/i.test(match)) return match;
            if (/class=["']/i.test(match)) {
                return match.replace(/class=["']([^"']*)["']/i, 'class="$1 case-content-title-h3"');
            }
            return `<h3 class="case-content-title-h3"${p1 ? ' ' + p1.trim() : ''}>`;
        }) : '';
    return (
        <section className="case-intro-section-area">
            <div className="container">
                <div className="case-intro-grid">
                    <aside className="case-intro-aside-row">

                        <div className="case-side-nav">
                            <div className="case-side-nav-area">
                                <div className="case-side-nav-row">
                                    
                                    <div className="case-side-contnet-area">
                                        <span>{dateLabel}</span>
                                        <h5>{formatDate(currentBlog?.date)}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="case-side-nav-area">
                                <div className="case-side-nav-row">
                                   
                                    <div className="case-side-contnet-area">
                                        <span>{categoryLabel}</span>
                                        <h5>{currentBlog?.category}</h5>
                                    </div>
                                </div>
                            </div>
                            


                        </div>
                    </aside>
                    <div className="case-main-content-area">
                        <div className="case-main-content">
                            <div className="case-content-area-box">
                                <div className="case-kicker">
                                    <span className="arr"><i className="fa fa-long-arrow-right"></i></span> {currentBlog?.category}
                                </div>
                                <h2 className="case-content-title">
                                    {currentBlog?.title}
                                </h2>

                                {isHtml ? (
                                    <div
                                        className="case-content-text"
                                        dangerouslySetInnerHTML={{ __html: formattedContent }}
                                    />
                                ) : (
                                    <div>
                                        {currentBlog?.content ? (
                                            currentBlog.content.split('\n\n').map((block, index) => {
                                                const trimmed = block.trim();
                                                if (!trimmed) return null;
                                                const isHeading = trimmed.length < 80 && !trimmed.endsWith('.') && !trimmed.endsWith(':');
                                                if (isHeading) {
                                                    return (
                                                        <h2 key={index} className="case-content-title" style={{ marginTop: "32px", fontSize: "28px" }}>
                                                            {trimmed}
                                                        </h2>
                                                    );
                                                }
                                                return (
                                                    <p key={index} className="case-content-text">
                                                        {trimmed}
                                                    </p>
                                                );
                                            })
                                        ) : (
                                            <p className="case-content-text">No content available.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
};

export default BlogIntroSection;
