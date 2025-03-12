'use client';

import { createRef, FC, FormEvent, RefObject, useState } from 'react';
import styles from '@/components/form/SendCode/SendCode.module.scss';
import { SendCodePropsIF } from '@/components/form/SendCode/SendCode.types';

const SendCode: FC<SendCodePropsIF> = ({
    isDisabled,
    hasError,
    callback,
    names,
    className = '',
}) => {
    const [code, setCode] = useState<string>('');
    const [inputRefsArray] = useState<RefObject<HTMLInputElement | null>[]>(
        () => Array.from(names, () => createRef()),
    );

    const inputHandler = (event: FormEvent, currentIndex: number): void => {
        event.preventDefault();
        if (isDisabled) {
            return;
        }

        const target = event.target as HTMLInputElement;
        target.select();
        target.focus();

        const newCode = [...code];
        newCode[currentIndex] = target.value.slice(-1).replace(/[^0-9]/g, '');

        // setCode(newCode);

        for (let i = 0; i < newCode.length; i += 1) {
            if (!newCode[i]) {
                const nextInput = inputRefsArray?.[i]?.current;
                if (nextInput) {
                    nextInput.focus();
                    nextInput.select();
                    return;
                }
            }
        }

        callback(newCode.join(''));
    };

    return (
        <div className={`${styles.sendCodeWrapper} ${className}`}>
            <div className={styles.digitsWrapper}>
                {names.map((name, index) => (
                    <div key={name}>
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
                            className={`${code[index] ? styles.filled : ''} ${hasError ? styles.error : ''}`}
                            inputMode="numeric"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SendCode;
