import { useEffect } from 'react';

export default function TestimonialsSection() {
    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');

        if (!testimonialItems.length || !testimonialDots.length) {
            return undefined;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let activeTestimonial = 0;
        let testimonialIntervalId = null;

        const showTestimonial = (index) => {
            testimonialItems.forEach((item, itemIndex) => {
                item.classList.toggle('active', itemIndex === index);
            });

            testimonialDots.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === index);
            });

            activeTestimonial = index;
        };

        const nextTestimonial = () => {
            showTestimonial((activeTestimonial + 1) % testimonialItems.length);
        };

        const dotHandlers = new Map();

        testimonialDots.forEach((dot, index) => {
            const handler = () => {
                showTestimonial(index);

                if (!prefersReducedMotion && testimonialIntervalId) {
                    window.clearInterval(testimonialIntervalId);
                    testimonialIntervalId = window.setInterval(nextTestimonial, 6000);
                }
            };

            dot.addEventListener('click', handler);
            dotHandlers.set(dot, handler);
        });

        if (!prefersReducedMotion) {
            testimonialIntervalId = window.setInterval(nextTestimonial, 6000);
        }

        return () => {
            if (testimonialIntervalId) {
                window.clearInterval(testimonialIntervalId);
            }

            dotHandlers.forEach((handler, dot) => {
                dot.removeEventListener('click', handler);
            });
        };
    }, []);

    return (
        <>
            <section className="testimonials-section-area">
                <div className="srcn-container">
                    <div className="common-wrapper-top-box">
                        <div className="common-subtitle ">
                            <span className=" Believe-subtitle">
                                
                                <span> ⟶  A Few Things We Believe</span>
                            </span>
                        </div>
                        <div className="testimonial-wrapper-row">
                            <div className="testimonial-item active">
                                <blockquote className="testimonial-item-heading">
                                    Organic and paid stopped competing. Pipeline went up 38%, CAC dropped 22%, and reporting finally said the same thing twice.
                                </blockquote>
                                <div className="testimonial-author">
                                    <p className="testimonial-title"> Priya Menon · Head of Growth · D2C Wellness Brand</p>
                                </div>
                            </div>
                            <div className="testimonial-item">
                                <blockquote className="testimonial-item-heading">
                                    They were already optimising for ChatGPT and Perplexity citations a year before our team raised it. That was the unlock.
                                </blockquote>
                                <div className="testimonial-author">
                                    <p className="testimonial-title "> Arjun Shah · CMO · B2B SaaS</p>
                                </div>
                            </div>
                            <div className="testimonial-item">
                                <blockquote className="testimonial-item-heading">
                                    “A real partner, not a deck factory. The work shows up in revenue, not vanity dashboards.”
                                </blockquote>
                                <div className="testimonial-author">
                                    <p className="testimonial-title"> Rohan Iyer · VP Marketing · Hospitality Group</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-dots">
                            <button className="testimonial-dot active" aria-label="Show testimonial 1"></button>
                            <button className="testimonial-dot" aria-label="Show testimonial 2"></button>
                            <button className="testimonial-dot" aria-label="Show testimonial 3"></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
