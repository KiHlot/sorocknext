import { useEffect, RefObject } from 'react';

export function useOutsideClick(
    reference: RefObject<HTMLElement | null>,
    handler: (value: boolean) => void,
) {
    useEffect(() => {
        if (!reference) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
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
}
