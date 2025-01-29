import { ReactElement, ReactNode } from 'react';

export interface ModalPropsIF {
    isOpen: boolean;
    closeHandler: () => void;
    children: ReactNode;
    blockOutsideClick?: boolean;
    title?: {
        label: string;
        icon?: ReactElement;
    };
    size?: 'default' | 'small' | 'large';
}
