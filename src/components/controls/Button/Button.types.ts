import {
    ReactElement,
    ReactNode,
    MouseEvent,
    ButtonHTMLAttributes,
} from 'react';

type ButtonVariantT =
    'primary' | 'secondary' | 'sq' | 'sq_error' | 'sq_info' | 'link' | 'accent';

export interface ButtonPropsIF extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    href?: string;
    htmlFor?: string;
    disabled?: boolean;
    isLoading?: boolean;
    clickHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariantT;
    icon?: ReactElement;
    isCustom?: boolean;
    dialogText?: ReactElement;
    dataTest: string;
}
