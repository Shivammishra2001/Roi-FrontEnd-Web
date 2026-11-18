import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found | ROI Mantra',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="not-found-page-wrapper">
      <section className="office-section contact-hero-section not-found-hero" style={{ display: 'flex', alignItems: 'center' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <source src="/images/abstract_background-banner.mp4" type="video/mp4" />
        </video>
        <div className="srcn-container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
            <div className="hero-small-subtitle contact-hero-badge">
              PAGE NOT FOUND
            </div>
            <h1 class="error-title discovery-heading">
              <span>Oops! This page</span>
              <span>doesn't exist.</span>
            </h1>
            <div
              className="blog-hero-description error-code">
              404
            </div>
            <p className='error-description'>The page you're looking for might have been moved. deleted or never existed. Let's get you back on track,</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <Link href="/" className="btn btn--primary btn-primary-erro-btn work-buttons">
                <span>Back to Home</span>
                <span className="arr">
                  <i className="fa fa-long-arrow-right"></i>
                </span>
              </Link>
              <Link href="/case-studies" className="btn btn--primary work-buttons">
                <span>Explore case studies</span>
                <span className="arr">
                  <i className="fa fa-long-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}
