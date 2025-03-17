import { FieldValues, Path, Control, UseFormClearErrors } from 'react-hook-form';

export interface CodeInputPropsIF<T extends FieldValues = FieldValues> {
    className?: string;
    names: string[];
    isDisabled: boolean;
    setValue: (name: Path<T>, newVal: string) => void;
    name: Path<T>;
    control: Control<T>;
    clearErrors:  UseFormClearErrors<T>;
}
