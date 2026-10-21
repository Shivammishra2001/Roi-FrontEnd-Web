'use client';

import { useEffect, useState } from 'react';

/**
 * True once the element comes within `margin` of the screen, and stays true.
 * Used to start loading a below-the-fold video or background image only when
 * the visitor is about to see it, so it doesn't compete with the first view.
 */
export default function useNearViewport(ref, margin = '300px') {
    const [near, setNear] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || near) return undefined;
        if (typeof IntersectionObserver === 'undefined') {
            setNear(true);
            return undefined;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNear(true);
                    observer.disconnect();
                }
            },
            { rootMargin: margin }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [ref, margin, near]);

    return near;
}
