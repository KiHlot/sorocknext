import { ReactElement, ReactNode } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface InputFileProps<T extends FieldValues = FieldValues> {
    register: UseFormRegister<T>;
    name: Path<T>;
    isDisabled?: boolean;
    changeHandler?: (fakePath?: string | null) => void;
    className?: string;
    acceptType: 'image';
    children: ReactNode;
    icon: ReactElement;
}
