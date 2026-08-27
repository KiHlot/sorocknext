import { FieldValues, Path, Control } from 'react-hook-form';

export interface CodeInputPropsIF<T extends FieldValues = FieldValues> {
    className?: string;
    label?: string;
    isRequired?: boolean;
    names: string[];
    isDisabled: boolean;
    name: Path<T>;
    control: Control<T>;
}
