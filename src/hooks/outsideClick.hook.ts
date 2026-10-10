import { useEffect, RefObject } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useOutsideClick = (
    reference: RefObject<HTMLElement | null>,
    callback: (() => void) | null,
    overlayId?: string,
    excludedElementId?: string,
): void => {
    const stack = useSelector(
        (state: RootState) => state.siteConfig.overlayStack,
    );

    useEffect(() => {
        if (!callback) {
            return;
        }

        const handleClick = (event: MouseEvent): void => {
            const target = event.target as Node;

            if (!reference.current || reference.current.contains(target)) {
                return;
            }

            if (excludedElementId) {
                const excludedElement = document.querySelector(
                    `#${excludedElementId}`,
                );

                if (excludedElement?.contains(target)) {
                    return;
                }
            }

            if (overlayId && stack.at(-1) !== overlayId) {
                return;
            }

            callback();
        };

        document.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener('mousedown', handleClick);
    }, [reference, callback, overlayId, excludedElementId, stack]);
};
