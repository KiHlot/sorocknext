'use client';

import {
    createRef,
    FormEvent,
    RefObject,
    useState,
    ClipboardEvent,
    ReactElement,
} from 'react';
import { FieldValues, useController } from 'react-hook-form';
import styles from '@/components/controls/CodeInput/CodeInput.module.scss';
import { CodeInputPropsIF } from '@/components/controls/CodeInput/CodeInput.types';
import FieldError from '@/components/elems/FieldError/FieldError.component';

const CodeInput = <T extends FieldValues>({
    setValue,
    names,
    isDisabled,
    className = '',
    name,
    control,
    clearErrors,
}: CodeInputPropsIF<T>): ReactElement => {
    const [code, setCode] = useState<string[]>(Array.from(names, () => ''));
    const [inputReferencesArray] = useState<
        RefObject<HTMLInputElement | null>[]
    >(() => Array.from(names, () => createRef()));

    const {
        field: { onChange },
        fieldState: { error },
    } = useController({ name, control });

    const inputHandler = (event: FormEvent, currentIndex: number): void => {
        event.preventDefault();

        if (isDisabled) {
            return;
        }

        if (!(event.target instanceof HTMLInputElement)) {
            return;
        }

        clearErrors();

        const target = event.target;

        target.select();
        target.focus();

        const newCode = [...code];
        newCode[currentIndex] = target.value
            .slice(-1)
            .replaceAll(/[^0-9]/g, '');

        setCode(newCode);
        setValue(name, newCode.join(''));

        for (const [index, element] of newCode.entries()) {
            if (!element) {
                const nextInput = inputReferencesArray?.[index]?.current;
                if (nextInput) {
                    nextInput.focus();
                    nextInput.select();
                    return;
                }
            }
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (isDisabled) {
            return;
        }

        const pastedData = event.clipboardData.getData('text');

        if (pastedData.length !== names.length) {
            return;
        }

        if (!/^\d+$/.test(pastedData)) {
            return;
        }
        clearErrors();
        setCode(Array.from(pastedData));
        event.currentTarget.blur();
        setValue(name, pastedData);
    };

    return (
        <div className={`flcol ${styles.codeInputWrapper} ${className}`}>
            <input
                type="hidden"
                name={name}
                value={code.join('') || ''}
                onChange={onChange}
            />
            <div
                className={`flc ${styles.inputsList} ${error?.message ? styles.error : ''}`}
            >
                {names.map((inputName, index) => (
                    <input
                        key={inputName}
                        ref={inputReferencesArray[index]}
                        type="text"
                        name={inputName}
                        placeholder="-"
                        onInput={event => {
                            inputHandler(event, index);
                        }}
                        value={code[index]}
                        inputMode="numeric"
                        onPaste={handlePaste}
                        className={isDisabled ? styles.disabled : ''}
                        disabled={isDisabled}
                    />
                ))}
            </div>
            <FieldError message={error?.message} className={styles.errorInfo} />
        </div>
    );
};

export default CodeInput;
