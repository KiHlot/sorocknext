import { ChangeEventHandler } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export type InputTypeT = 'text' | 'password' | 'number';

export interface InputProps<T extends FieldValues = FieldValues> {
    control?: Control<T>;
    label?: string;
    name: Path<T>;
    type?: InputTypeT;
    placeholder?: string;
    isDisabled?: boolean;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    maxLength?: number;
    isRemoveSpaces?: boolean;
    isNumbersOnly?: boolean;
    isTextsOnly?: boolean;
    isRequired?: boolean;
    isPassword?: boolean;
    styleType?: 'default' | 'main';
}
