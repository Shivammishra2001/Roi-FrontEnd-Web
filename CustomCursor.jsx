"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        if (!dot || !window.matchMedia('(hover: hover)').matches) {
            return;
        }

        let currentX = -100;
        let currentY = -100;
        let targetX = currentX;
        let targetY = currentY;
        let frameId = 0;
        let isVisible = false;

        const onMove = (event) => {
            targetX = event.clientX;
            targetY = event.clientY;
            if (!isVisible) {
                isVisible = true;
                dot.style.opacity = '1';
            }
        };

        const onLeave = () => {
            isVisible = false;
            dot.style.opacity = '0';
        };

        const tick = () => {
            currentX += (targetX - currentX) * 0.22;
            currentY += (targetY - currentY) * 0.22;
            dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
            frameId = window.requestAnimationFrame(tick);
        };

        const interactive = 'a, button, [role="button"], input[type="submit"], .btn, .common-wrapper-btn, .blog-card-wrapper, .popular-blog-item, .pill, .work-tile';
        
        const onOver = (event) => {
            if (event.target && event.target.closest && event.target.closest(interactive)) {
                dot.classList.add('hover');
            }
        };

        const onOut = (event) => {
            if (event.target && event.target.closest && event.target.closest(interactive)) {
                dot.classList.remove('hover');
            }
        };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);
        frameId = window.requestAnimationFrame(tick);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
        };
    }, []);

    return <div ref={dotRef} className="cursor-dot" />;
}
