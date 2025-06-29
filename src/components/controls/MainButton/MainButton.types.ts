import { ReactElement, ReactNode } from 'react';

type ButtonVariantT = 'primary' | 'secondary' | 'sq' | 'link' | 'accent';

export interface MainButtonPropsIF {
    children?: ReactNode;
    href?: string;
    htmlFor?: string;
    disabled?: boolean;
    isLoading?: boolean;
    clickHandler?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariantT;
    icon?: ReactElement;
    isCustom?: boolean;
    dialogText?: ReactElement;
}
