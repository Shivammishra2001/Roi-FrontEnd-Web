"use client";

import { useEffect } from 'react';

export default function TestimonialsSection({ eyebrow, testimonials }) {
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
                                <span>{eyebrow}</span>
                            </span>
                        </div>
                        <div className="testimonial-wrapper-row">
                            {testimonials.map((t, i) => (
                                <div className={`testimonial-item${i === 0 ? ' active' : ''}`} key={i}>
                                    <blockquote className="testimonial-item-heading">
                                        {t.quote}
                                    </blockquote>
                                    <div className="testimonial-author">
                                        <p className={`testimonial-title${i === 1 ? ' ' : ''}`}>{t.attribution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="testimonial-dots">
                            {testimonials.map((t, i) => (
                                <button key={i} className={`testimonial-dot${i === 0 ? ' active' : ''}`} aria-label={t.dotAriaLabel}></button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
