import { ChangeEvent, ReactElement } from 'react';
import { FieldValues } from 'react-hook-form';
import { VALIDATORS } from '@/helpers/validator';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import buttonStyles from '@/components/elems/MainButton/MainButton.module.scss';
import styles from '@/components/form/InputFile/inputFile.module.scss';
import { InputFilePropsIF } from '@/components/form/InputFile/InputFile.types';

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
