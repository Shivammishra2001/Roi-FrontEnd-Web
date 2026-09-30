'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import '../Contact.css';
import RecaptchaWidget from './RecaptchaWidget';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    designation: '',
    phone: '',
    requirement: '',
    agreePrivacy: false,
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [submitError, setSubmitError] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const btnRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCaptchaClick = () => {
    if (captchaLoading) return;
    if (captchaVerified) {
      setCaptchaVerified(false);
      return;
    }
    setCaptchaLoading(true);
    setCaptchaError(false);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaVerified(true);
    }, 700);
  };

  const handleBtnMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn || status === 'submitting') return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
    gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
  };

  const handleBtnMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      setCaptchaError(true);
      return;
    }

    setStatus('submitting');
    setSubmitError(false);

    try {
      // The form has no "service"/"budget" inputs and the contact-submission
      // schema has no "designation" field, so those don't appear on either
      // side of this mapping — name/requirement map to Strapi's
      // fullName/message field names, everything else matches as-is.
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            fullName: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            message: formData.requirement,
          },
        }),
      });

      if (!res.ok) throw new Error(`Submission failed with status ${res.status}`);

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        designation: '',
        phone: '',
        requirement: '',
        agreePrivacy: false,
      });
      setCaptchaVerified(false);
      setCaptchaError(false);
    } catch (err) {
      setStatus('idle');
      setSubmitError(true);
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setCaptchaVerified(false);
    setCaptchaError(false);
    setSubmitError(false);
  };

  return (
    <div className="contact-form-card">
      {status === 'success' ? (
        <div className="form-success-container" role="status">
          <div className="success-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="success-check-svg">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="success-title">Thank You!</h3>
          <p className="success-description">
            Your inquiry has been received. Our team will review it and get back to you within 24 hours.
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="btn-secondary-custom"
          >
            <span>Send Another Message</span>
            <span className="arr"> ↗</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="clean-styled-form" noValidate>
          {/* Full Name */}
          <div className="floating-input-group">
            <input
              type="text"
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`floating-input ${formData.name ? 'has-value' : ''}`}
              placeholder=" "
              required
            />
            <label htmlFor="contact-name" className="floating-label">
              Name <span className="req-star">*</span>
            </label>
          </div>

          {/* Email */}
          <div className="floating-input-group">
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`floating-input ${formData.email ? 'has-value' : ''}`}
              placeholder=" "
              required
            />
            <label htmlFor="contact-email" className="floating-label">
              Email <span className="req-star">*</span>
            </label>
          </div>

          {/* Company */}
          <div className="floating-input-group">
            <input
              type="text"
              id="contact-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`floating-input ${formData.company ? 'has-value' : ''}`}
              placeholder=" "
            />
            <label htmlFor="contact-company" className="floating-label">
              Company
            </label>
          </div>

          {/* Designation */}
          <div className="floating-input-group">
            <input
              type="text"
              id="contact-designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className={`floating-input ${formData.designation ? 'has-value' : ''}`}
              placeholder=" "
            />
            <label htmlFor="contact-designation" className="floating-label">
              Designation
            </label>
          </div>

          {/* Phone Number */}
          <div className="floating-input-group">
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`floating-input ${formData.phone ? 'has-value' : ''}`}
              placeholder=" "
            />
            <label htmlFor="contact-phone" className="floating-label">
              Phone Number
            </label>
          </div>

          {/* Briefly Describe Your Requirement */}
          <div className="floating-input-group">
            <textarea
              id="contact-requirement"
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              rows={2}
              className={`floating-input floating-textarea ${formData.requirement ? 'has-value' : ''}`}
              placeholder=" "
              required
            />
            <label htmlFor="contact-requirement" className="floating-label">
              Briefly Describe Your Requirement <span className="req-star">*</span>
            </label>
          </div>

          {/* Privacy Policy Agreement Checkbox */}
          <div className="form-checkbox-row">
            <label className="custom-checkbox-container">
              <input
                type="checkbox"
                name="agreePrivacy"
                checked={formData.agreePrivacy}
                onChange={handleChange}
                className="hidden-checkbox"
              />
              <span className={`custom-checkbox-box ${formData.agreePrivacy ? 'checked' : ''}`}>
                {formData.agreePrivacy && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="check-mark-svg">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span className="checkbox-label-text">
                I agree to the <Link href="#" className="privacy-link">Privacy Policy</Link> and receive exclusive Insights.
              </span>
            </label>
          </div>

          {/* Google reCAPTCHA v2 Widget */}
          <RecaptchaWidget
            isVerified={captchaVerified}
            isLoading={captchaLoading}
            hasError={captchaError}
            onCaptchaClick={handleCaptchaClick}
          />

          {/* Submit Button */}
          <button
            ref={btnRef}
            type="submit"
            disabled={status === 'submitting'}
            className="submit-btn-vibrant"
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
          >
            {status === 'submitting' ? (
              <span className="btn-spinner-wrap">
                <span className="btn-spinner" />
                <span>Sending…</span>
              </span>
            ) : (
              <>
                <span>Submit Message</span>
                <span className="arr">↗</span>
              </>
            )}
          </button>

          {submitError && (
            <span className="recaptcha-error-text">
              Something went wrong sending your message. Please try again.
            </span>
          )}

          {/* Security Guarantee */}
          <div className="security-notice-row">
            <svg
              className="security-shield-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="security-text">
              Your information is secure and never shared with third parties.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
