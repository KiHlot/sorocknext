'use client';

import { createRef, FC, FormEvent, RefObject, useState } from 'react';
import styles from '@/components/form/SendCode/SendCode.module.scss';
import { SendCodePropsIF } from '@/components/form/SendCode/SendCode.types';

const SendCode: FC<SendCodePropsIF> = ({
    callback,
    names,
    isDisabled,
    className = '',
}) => {
    const [code, setCode] = useState<string[]>(Array.from(names, () => ''));
    const [inputRefsArray] = useState<RefObject<HTMLInputElement | null>[]>(
        () => Array.from(names, () => createRef()),
    );

    const inputHandler = (event: FormEvent, currentIndex: number): void => {
        event.preventDefault();

        if (isDisabled) {
            return;
        }

        if (!(event.target instanceof HTMLInputElement)) return;

        const target = event.target;

        target.select();
        target.focus();

        const newCode = [...code];
        newCode[currentIndex] = target.value.slice(-1).replace(/[^0-9]/g, '');

        setCode(newCode);
        callback(newCode.join(''));

        for (let i = 0; i < newCode.length; i++) {
            if (!newCode[i]) {
                const nextInput = inputRefsArray?.[i]?.current;
                if (nextInput) {
                    nextInput.focus();
                    nextInput.select();
                    return;
                }
            }
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
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

        setCode(Array.from(pastedData));
        event.currentTarget.blur();
        callback(pastedData);
    };

    return (
        <div className={`flc ${styles.sendCodeWrapper} ${className}`}>
            {names.map((name, index) => (
                <input
                    key={name}
                    ref={inputRefsArray[index]}
                    type="text"
                    name={name}
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
    );
};

export default SendCode;
