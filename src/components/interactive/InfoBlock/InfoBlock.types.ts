import { ReactNode } from 'react';

export interface InfoBlockPropsIF {
    className?: string;
    title?: string;
    onClose?: () => void;
    children: ReactNode;
    variant?: 'error' | 'success' | 'info' | 'outlined';
}
