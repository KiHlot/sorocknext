import { useEffect, RefObject } from 'react';

export function useOutsideClick(
    ref: RefObject<HTMLElement | null>,
    handler: (value: boolean) => void,
) {
    useEffect(() => {
        if (!ref) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, handler]);
}
