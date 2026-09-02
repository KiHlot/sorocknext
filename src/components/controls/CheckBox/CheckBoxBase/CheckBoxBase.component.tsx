'use client';

import { ChangeEvent, FC } from 'react';
import { FaCheck } from 'react-icons/fa6';
import styles from '@/components/controls/CheckBox/CheckBoxBase/CheckBoxBase.module.scss';
import { CheckBoxBaseIF } from '@/components/controls/CheckBox/CheckBoxBase/CheckBoxBase.types';
import FieldError from '@/components/elems/FieldError/FieldError.component';

const CheckBoxBase: FC<CheckBoxBaseIF> = ({
    label,
    name,
    value,
    error,
    isDisabled = false,
    isChecked = false,
    className = '',
    onChange,
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (isDisabled) {
            return;
        }

        onChange?.(e);
    };

    return (
        <div className={`${styles.inputBlock} ${className}`}>
            <div className={styles.checkBoxBaseWrapper}>
                <label className={styles.checkBoxLabel} htmlFor={name}>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        id={name}
                        checked={isChecked}
                        onChange={handleChange}
                        value={value}
                        disabled={isDisabled}
                    />
                    <span className={`flc ${styles.customCheckBox}`}>
                        {isChecked && <FaCheck />}
                    </span>
                    {label && label}
                </label>
            </div>
            <FieldError message={error} />
        </div>
    );
};

export default CheckBoxBase;
