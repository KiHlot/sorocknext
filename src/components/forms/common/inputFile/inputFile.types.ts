import { ReactElement, ReactNode } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { FileInputT } from '@/types/common';

export interface InputFileProps<T extends FieldValues = FieldValues> {
    register: UseFormRegister<T>;
    name: Path<T>;
    isDisabled?: boolean;
    changeHandler?: (fakePath?: string | null) => void;
    className?: string;
    acceptType: FileInputT;
    children: ReactNode;
    icon: ReactElement;
}
