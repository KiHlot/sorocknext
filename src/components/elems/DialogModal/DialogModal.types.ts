import { ReactNode } from 'react';

export interface DialogModalPropsIF {
    dialogText: ReactNode;
    clickHandler: () => void;
    open: boolean;
}
