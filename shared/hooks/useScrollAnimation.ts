import { useState, useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
    threshold?: number;
    triggerOnce?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
    const { threshold = 0.1, triggerOnce = true } = options;
    const elementRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(el);
                    }
                }
            },
            { threshold }
        );

        observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [threshold, triggerOnce]);

    return { ref: elementRef, isVisible };
};
