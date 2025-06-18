import { ChangeEventHandler, FocusEventHandler } from 'react';

export interface CheckBoxPropsIF {
    label?: string;
    name: string;
    error?: string;
    backError?: string;
    isChecked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    value?: string;
    className?: string;
    isDisabled?: boolean;
}
