import { ReactElement, ReactNode } from 'react';

export interface MainButtonPropsIF {
    children?: ReactNode;
    href?: string;
    htmlFor?: string;
    disabled?: boolean;
    clickHandler?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?:
        | 'accent'
        | 'light'
        | 'default'
        | 'sq'
        | 'sq_delete'
        | 'green'
        | 'info';
    icon?: ReactElement;
    dialogText?: ReactElement;
}
