import { ReactNode } from 'react';

export interface DialogModalPropsIF {
    dialogText: ReactNode;
    clickHandler: () => void;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}
