
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactSection({
  label,
  title,
  subtitle,
  emailLabel,
  email,
  phoneLabel,
  phone,
  phoneHref,
  scheduleButtonHref,
  fullNamePlaceholder,
  phonePlaceholder,
  budgetPlaceholder,
  budgetOptions = [],
  helpPlaceholder,
  helpOptions = [],
  messagePlaceholder,
  submitLabel,
  submittingLabel,
  successMessage,
  errorMessage,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    budget: "",
    help: "",
    message: "",
    website: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorText, setSubmitErrorText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitError(false);
    setSubmitErrorText("");

    try {
      // app/contact/submit/route.js saves the lead in Strapi and emails it.
      // Same-origin path, so the browser never blocks it (https page).
      const res = await fetch("/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          budget: formData.budget,
          service: formData.help,
          message: formData.message,
          source: window.location.href,
          website: formData.website,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        // Show the server's reason for a rejected form (e.g. invalid phone).
        setSubmitErrorText(Object.values(body?.errors || {})[0] || "");
        throw new Error(`Submission failed with status ${res.status}`);
      }
    } catch (err) {
      setSubmitError(true);
      return;
    } finally {
      setSubmitting(false);
    }

    setSubmitted(true);

    setFormData({
      fullName: "",
      phone: "",
      budget: "",
      help: "",
      message: "",
      website: "",
    });

    router.push("/thank-you");
  };

  const handleScheduleCall = () => {
    if (scheduleButtonHref) window.location.href = scheduleButtonHref;
  };

  return (
    <section className="contact-section-area">
      <div className=" srcn-container">
        <div className="contact-wrapper">
          <div className="contact-grid">
            <div className="contact-left">
              <div className="section-label">
                <span>
                  <span className="arr">
                    <i className="fa fa-long-arrow-right"></i>
                  </span>
                  {label}
                </span>
              </div>
              <h1 className="contact-title">
                {title}
              </h1>

              <p className="contact-subtitle">
                {subtitle}
              </p>
              <div className="contact-info">
                <div className="contact-info-card">
                  <div className="info-icon">
                    <i
                      className="fa fa-envelope-o"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="info-content">
                    <span className="info-label">
                      {emailLabel}
                    </span>
                    <span className="info-value">
                      <a href={`mailto:${email}`}>
                        {email}
                      </a>
                    </span>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="info-icon">
                    <i
                      className="fa fa-phone"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="info-content">
                    <span className="info-label">
                      {phoneLabel}
                    </span>
                    <span className="info-value">
                      <a href={phoneHref}>
                        {phone}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="contact-social">
                <p className="contact-social-title">Follow Us</p>
            
                <div className="contact-social-icons" aria-label="Social media">

                  <a
                    className="contact-social-icon"
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>

                  <a
                    className="contact-social-icon"
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>

                  <a
                    className="contact-social-icon contact-social-x"
                    href="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                  >
                   <i class="fa fa-twitter" aria-hidden="true"></i>
                  </a>

                  <a
                    className="contact-social-icon"
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>

                  <a
                    className="contact-social-icon"
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                  </a>

                </div>
              </div>
            </div>

            {/* ================= RIGHT FORM ================= */}
            <div className="contact-form-wrapper">

              <form
                className="contact-form"
                id="projectForm"
                onSubmit={handleSubmit}
              >
                {/* Spam trap: hidden from people, filled in by bots (see app/contact/submit/route.js). */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                  value={formData.website} onChange={handleChange}
                  style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }} />

                {/* FULL NAME */}
                <div className="form-group">

                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder={fullNamePlaceholder}
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder={phonePlaceholder?.trim() || "Phone Number"}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* PROJECT BUDGET */}
                <div className="form-group">

                  <select
                    name="budget"
                    className="form-select"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >

                    <option value="" disabled>
                      {budgetPlaceholder}
                    </option>

                    {budgetOptions.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    ))}

                  </select>

                  <span className="select-arrow" aria-hidden="true">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>

                </div>

                {/* HOW CAN WE HELP */}
                <div className="form-group">

                  <select
                    name="help"
                    className="form-select"
                    value={formData.help}
                    onChange={handleChange}
                    required
                  >

                    <option value="" disabled>
                      {helpPlaceholder}
                    </option>

                    {helpOptions.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    ))}

                  </select>

                  <span className="select-arrow" aria-hidden="true">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>

                </div>

                {/* MESSAGE */}
                <div className="form-group">

                  <textarea
                    name="message"
                    className="form-textarea"
                    placeholder={messagePlaceholder}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>

                {/* SUBMIT */}
                <div className="submit-row">

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={submitting}
                  >

                    <span className="submit-text">
                      {submitting ? submittingLabel : submitLabel}
                    </span>

                    <span className="button-arrow">
                      <i className="fa fa-long-arrow-right"></i>
                    </span>

                  </button>

                </div>

                {/* SUCCESS MESSAGE */}
                {submitted && (
                  <div className="form-success">
                    {successMessage}
                  </div>
                )}

                {submitError && (
                  <div className="form-success" role="alert">
                    {submitErrorText || errorMessage}
                  </div>
                )}

              </form>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
