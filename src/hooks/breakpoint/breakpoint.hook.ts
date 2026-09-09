import { useState, useLayoutEffect, useRef } from 'react';
import {
    DEFAULT_BREAKPOINT,
    DELAY,
} from '@/hooks/breakpoint/breakpoint.config';

export const useBreakpoint = (
    breakpoint: number = DEFAULT_BREAKPOINT,
): boolean => {
    const [isLess, setIsLess] = useState<boolean>(
        () => typeof window !== 'undefined' && window.innerWidth < breakpoint,
    );

    const previousIsLessRef = useRef<boolean>(isLess);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useLayoutEffect(() => {
        const update = (): void => {
            const newIsLess = window.innerWidth < breakpoint;
            if (newIsLess !== previousIsLessRef.current) {
                previousIsLessRef.current = newIsLess;
                setIsLess(newIsLess);
            }
        };

        update();

        const handleResize = (): void => {
            if (timeoutRef.current) {
                return;
            }

            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = null;
                update();
            }, DELAY);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [breakpoint]);

    return isLess;
};
