import { useEffect, RefObject } from 'react';

export const useOutsideClick = (
    reference: RefObject<HTMLElement | null>,
    handler: (value: boolean) => void,
): void => {
    useEffect(() => {
        if (!reference) {
            return;
        }

        const handleClickOutside = (event: MouseEvent): void => {
            if (
                reference.current &&
                !reference.current.contains(event.target as Node)
            ) {
                handler(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [reference, handler]);
};
