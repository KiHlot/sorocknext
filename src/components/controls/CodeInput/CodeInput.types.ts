import { FieldValues, Path, Control } from 'react-hook-form';

export interface CodeInputPropsIF<T extends FieldValues = FieldValues> {
    className?: string;
    names: string[];
    isDisabled: boolean;
    name: Path<T>;
    control: Control<T>;
}
