
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
  scheduleTitle,
  profileImage,
  profileName,
  profileRole,
  scheduleButtonLabel,
  scheduleButtonHref,
  fullNamePlaceholder,
  emailPlaceholder,
  phonePlaceholder = "Phone",
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
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

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

    try {
      // Field names match Strapi's contact-submission schema; "help" is
      // stored in its `service` field. Same-origin path: Nginx sends /api to
      // Strapi on every host the site is served from (roimantra.com over
      // HTTPS, the server IP), so the browser never makes a cross-origin or
      // insecure (http on an https page) request that it would block.
      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            fullName: formData.fullName,
            phone: formData.phone,
            budget: formData.budget,
            service: formData.help,
            message: formData.message,
          },
        }),
      });

      if (!res.ok) throw new Error(`Submission failed with status ${res.status}`);
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
              {/* Schedule-a-call card hidden, as on the localhost design.
              <div className="schedule-title">
                <span>
                  <span className="arr">
                    <i className="fa fa-long-arrow-right"></i>
                  </span>
                  {scheduleTitle}
                </span>
              </div>

              <div className="schedule-card">
                <div className="profile-row">

                  {profileImage?.url && (
                    <img
                      className="profile-image"
                      src={profileImage.url}
                      alt={profileImage.alt}
                    />
                  )}

                  <div className="profile-info">
                    <h4>
                      {profileName}
                    </h4>

                    <span>
                      {profileRole}
                    </span>
                  </div>

                </div>

                <button
                  className="schedule-btn"
                  type="button"
                  onClick={handleScheduleCall}
                >
                  {scheduleButtonLabel}

                  <span className="button-arrow">
                     <i className="fa fa-long-arrow-right"></i>
                  </span>
                </button>

              </div> */}

            </div>

            {/* ================= RIGHT FORM ================= */}
            <div className="contact-form-wrapper">

              <form
                className="contact-form"
                id="projectForm"
                onSubmit={handleSubmit}
              >

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

                {/* PHONE */}
                <div className="form-group">

                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder={phonePlaceholder}
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
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
                    {errorMessage}
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
