import { Control, FieldValues, Path } from 'react-hook-form';

export interface TextAreaPropsIF<T extends FieldValues = FieldValues> {
    control?: Control<T>;
    label?: string;
    name: Path<T>;
    backError?: string;
    placeholder?: string;
    isDisabled?: boolean;
    className?: string;
    maxLength?: number;
    isRequired?: boolean;
}
