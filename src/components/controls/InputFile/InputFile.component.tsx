'use client';

import { ChangeEvent, ReactElement } from 'react';
import { FieldValues } from 'react-hook-form';
import { VALIDATORS } from '@/helpers/validator';
import styles from '@/components/controls/InputFile/InputFile.module.scss';
import { InputFilePropsIF } from '@/components/controls/InputFile/InputFile.types';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import buttonStyles from '@/components/elems/MainButton/MainButton.module.scss';

export const InputFile = <T extends FieldValues>({
    isDisabled,
    name,
    changeHandler,
    acceptType,
    children,
    icon,
    register,
    className = '',
}: InputFilePropsIF<T>): ReactElement => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;

        if (file) {
            const fileUrl = URL.createObjectURL(file);
            changeHandler?.(fileUrl);
        } else {
            changeHandler?.(null);
        }
    };

    return (
        <MainButton
            htmlFor={name}
            className={`flc ${styles.label} ${buttonStyles.button} ${className}`}
            icon={icon}
            disabled={isDisabled}
        >
            <input
                {...register(name)}
                id={name}
                name={name}
                type="file"
                accept={VALIDATORS[acceptType]?.accept?.join(',') ?? ''}
                className={styles.inputFile}
                onInput={handleChange}
            />
            {children}
        </MainButton>
    );
};
