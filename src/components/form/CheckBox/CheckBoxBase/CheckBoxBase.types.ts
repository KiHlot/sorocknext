import { ChangeEvent } from 'react';

export interface CheckBoxBaseIF {
    label?: string;
    name: string;
    isChecked?: boolean;
    defaultChecked?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    className?: string;
    isDisabled?: boolean;
    error?: string;
}
