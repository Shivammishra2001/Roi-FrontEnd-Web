'use client';

export default function RecaptchaWidget({
  isVerified,
  isLoading,
  hasError,
  onCaptchaClick,
}) {
  return (
    <div className="recaptcha-wrapper">
      <div
        className={`recaptcha-widget ${hasError ? 'recaptcha-error' : ''}`}
        onClick={onCaptchaClick}
        role="button"
        tabIndex={0}
        aria-label="reCAPTCHA Checkbox: I'm not a robot"
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onCaptchaClick();
          }
        }}
      >
        <div className="recaptcha-left">
          <div className={`recaptcha-checkbox-sq ${isVerified ? 'verified' : ''}`}>
            {isLoading && <span className="recaptcha-spinner" />}
            {isVerified && !isLoading && (
              <svg viewBox="0 0 24 24" className="recaptcha-check-svg" fill="none">
                <path
                  d="M4.5 12.5L9.5 17.5L19.5 6.5"
                  stroke="#00a859"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span className="recaptcha-label-text">I&apos;m not a robot</span>
        </div>

        <div className="recaptcha-right">
          <div className="recaptcha-brand-icon">
            <img
              src="/images/recaptcha-logo.png"
              alt="reCAPTCHA"
              width={32}
              height={32}
              className="recaptcha-logo-img"
            />
          </div>
          <span className="recaptcha-brand-name">reCAPTCHA</span>
        </div>
      </div>
      {hasError && (
        <span className="recaptcha-error-text">Please verify that you are not a robot.</span>
      )}
    </div>
  );
}
