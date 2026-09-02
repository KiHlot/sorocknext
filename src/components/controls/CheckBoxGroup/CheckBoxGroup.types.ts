import { Control, FieldValues, Path } from 'react-hook-form';
import { OptionIF } from '@/types/common';

export interface CheckBoxGroupPropsIF<T extends FieldValues = FieldValues> {
    control?: Control<T>;
    name: Path<T>;
    className?: string;
    isDisabled?: boolean;
    options: OptionIF[];
}
