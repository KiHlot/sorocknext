'use client';

import { ChangeEvent, ReactElement } from 'react';
import { FieldValues } from 'react-hook-form';
import { VALIDATOR_FILE } from '@/helpers/validation/validation.config';
import styles from '@/components/controls/InputFile/InputFile.module.scss';
import { InputFilePropsIF } from '@/components/controls/InputFile/InputFile.types';
import Button from '@/components/controls/Button/Button.component';
import buttonStyles from '@/components/controls/Button/Button.module.scss';

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
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0] ?? null;

        if (file) {
            const fileUrl = URL.createObjectURL(file);
            changeHandler?.(fileUrl);
        } else {
            changeHandler?.(null);
        }
    };

    return (
        <Button
            htmlFor={name}
            className={`flc ${styles.label} ${buttonStyles.button} ${className}`}
            icon={icon}
            disabled={isDisabled}
            dataTest={`${name}_file`}
        >
            <input
                {...register(name)}
                id={name}
                name={name}
                type="file"
                accept={VALIDATOR_FILE[acceptType]?.accept?.join(',') ?? ''}
                className={styles.inputFile}
                onChange={handleChange}
            />
            {children}
        </Button>
    );
};
