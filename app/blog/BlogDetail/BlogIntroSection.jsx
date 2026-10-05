"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "../../../lib/format";

const EMPTY_FORM = { fullName: "", phone: "", email: "", message: "" };

const BlogIntroSection = ({ currentBlog, dateLabel, categoryLabel }) => {
    const router = useRouter();
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Same endpoint as the Contact page form. The message also records which
    // post the enquiry came from.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        setSubmitError(false);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || ""}/api/contact-submissions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: {
                        fullName: formData.fullName,
                        phone: formData.phone,
                        email: formData.email,
                        message: `${formData.message.trim()}

— Sent from blog post: ${currentBlog?.title || ""} (${window.location.href})`,
                    },
                }),
            });

            if (!res.ok) throw new Error(`Submission failed with status ${res.status}`);
        } catch (err) {
            setSubmitError(true);
            setSubmitting(false);
            return;
        }

        setFormData(EMPTY_FORM);
        router.push("/thank-you");
    };

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

                            <div className="case-intro-wrapper">
                                <div className="case-intros">

                                    <div className="case-intro-form-wrapper">
                                        <h3 className="intro-form-heading">
                                            Let’s Talk About Your Project
                                        </h3>
                                        <form
                                            className="case-intro-form"
                                            id="projectForm"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="case-intro-form-group">
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    className="case-intro-form-control"
                                                    placeholder="Full Name"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="case-intro-form-group">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="case-intro-form-control"
                                                    placeholder="Phone Number"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="case-intro-form-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="case-intro-form-control"
                                                    placeholder="Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="case-intro-form-group">
                                                <textarea
                                                    name="message"
                                                    className="case-intro-form-control case-intro-form-textarea"
                                                    placeholder="Tell us about your product and goals."
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows={4}
                                                    required
                                                ></textarea>
                                            </div>

                                            <div className="submit-row">
                                                <button
                                                    type="submit"
                                                    className="submit-btn work-button"
                                                    disabled={submitting}
                                                >
                                                    <span className="submit-text">
                                                        {submitting ? "Sending..." : "Send Message"}
                                                    </span>

                                                    <span className="button-arrow">
                                                        <i className="fa fa-long-arrow-right"></i>
                                                    </span>
                                                </button>
                                            </div>

                                            {submitError && (
                                                <p className="case-intro-form-error" role="alert">
                                                    Something went wrong. Please try again.
                                                </p>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </aside>
                    <div className="case-main-content-area">
                        <div className="case-main-content">
                            <div className="case-content-area-box">

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
