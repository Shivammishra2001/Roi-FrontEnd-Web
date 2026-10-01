
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    budget: "",
    help: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

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
    window.location.href = "tel:+911246656000";
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
                     Get In Touch
                </span>
              </div>
              <h1 className="contact-title">
                Have a Project?
              </h1>

              <p className="contact-subtitle">
                Let's turn your research needs into actionable insights.
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
                      Email
                    </span>
                    <span className="info-value">
                      <a href="mailto:info@roimantra.com">
                       info@roimantra.com
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
                      Call Us
                    </span>
                    <span className="info-value">
                      <a href="tel:+91 9650095232">
                        +91 9650095232
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="schedule-title">
                <span>
                  <span className="arr">
                    <i className="fa fa-long-arrow-right"></i>
                  </span>
                  Schedule A Call
                </span>
              </div>

              <div className="schedule-card">
                <div className="profile-row">

                  <img
                    className="profile-image"
                    src="/images/saksham-gupta-img.png"
                    alt="Saksham Gupta"
                  />

                  <div className="profile-info">
                    <h4>
                      Saksham Gupta
                    </h4>

                    <span>
                      CEO
                    </span>
                  </div>

                </div>

                <button
                  className="schedule-btn"
                  type="button"
                  onClick={handleScheduleCall}
                >
                  Schedule a Quick Call

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
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* EMAIL */}
                <div className="form-group">

                  <input
                    type="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
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
                      Project budget
                    </option>

                    <option value="below-5">
                      Below ₹5 Lakhs
                    </option>

                    <option value="5-10">
                      ₹5 Lakhs - ₹10 Lakhs
                    </option>

                    <option value="10-25">
                      ₹10 Lakhs - ₹25 Lakhs
                    </option>

                    <option value="25-plus">
                      ₹25 Lakhs+
                    </option>

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
                      How can we help you?
                    </option>

                    <option value="research">
                      Research & Consulting
                    </option>

                    <option value="technology">
                      Technology Solutions
                    </option>

                    <option value="strategy">
                      Strategy & Advisory
                    </option>

                    <option value="other">
                      Other
                    </option>

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
                    placeholder="Tell us about your product and goals."
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
                  >

                    <span className="submit-text">
                      Send Message
                    </span>

                    <span className="button-arrow">
                       <i className="fa fa-long-arrow-right"></i>
                    </span>

                  </button>

                </div>

                {/* SUCCESS MESSAGE */}
                {submitted && (
                  <div className="form-success">
                    Thank you! Your message has been submitted successfully.
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
