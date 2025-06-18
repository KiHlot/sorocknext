'use client';

import { ReactElement, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { RiLockPasswordFill } from 'react-icons/ri';
import { RiLockPasswordLine } from 'react-icons/ri';
import styles from '@/components/controls/Input/Input.module.scss';
import {
    InputProps,
    InputTypeT,
} from '@/components/controls/Input/Input.types';
import FieldError from '@/components/elems/FieldError/FieldError.component';
import FieldLabel from '@/components/elems/FieldLabel/FieldLabel.component';

export const Input = <T extends FieldValues>({
    label,
    type,
    placeholder,
    isDisabled,
    name,
    control,
    maxLength,
    isRemoveSpaces,
    isNumbersOnly,
    isTextsOnly,
    isRequired,
    isPassword,
    className = '',
    styleType = 'main',
}: InputProps<T>): ReactElement => {
    const {
        field: { value, onChange },
        fieldState,
    } = useController({ name, control });

    const [currentType, setCurrentType] = useState<InputTypeT>(
        type ? type : 'text',
    );

    const normalizeValue = (value: string | null): string => {
        let newValue: string | null | undefined =
            isRemoveSpaces && value ? value.replace(/\s+/g, '') : value;

        newValue = isNumbersOnly ? newValue?.replace(/\D/g, '') : newValue;
        newValue = isTextsOnly
            ? newValue?.replace(/[^а-яёА-ЯЁa-zA-Z]/g, '')
            : newValue;

        return newValue || '';
    };

    return (
        <div className={`${styles.inputBlock} ${className}`}>
            <FieldLabel
                label={label}
                isRequired={isRequired}
                isError={!!fieldState.error?.message}
            />
            <div
                className={`${styles.inputWrapper} ${isPassword ? styles.password : ''}`}
            >
                <input
                    name={name}
                    type={currentType}
                    value={normalizeValue(value)}
                    onChange={event =>
                        onChange(normalizeValue(event.target.value) || '')
                    }
                    placeholder={placeholder}
                    disabled={isDisabled}
                    maxLength={maxLength}
                    autoComplete={`${name}off`}
                    className={styles[styleType]}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentType(
                                currentType === 'text' ? 'password' : 'text',
                            )
                        }
                        className="flc"
                    >
                        {currentType === 'text' ? (
                            <RiLockPasswordFill />
                        ) : (
                            <RiLockPasswordLine />
                        )}
                    </button>
                )}
            </div>
            <FieldError message={fieldState.error?.message} />
        </div>
    );
};
