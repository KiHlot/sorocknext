import { ReactNode } from 'react';

export interface SectionPropsIF {
    children: ReactNode;
    className?: string;
    ariaLabel?: string;
    title?: string;
}
