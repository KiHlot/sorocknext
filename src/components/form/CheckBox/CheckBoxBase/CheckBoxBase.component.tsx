import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import styles from '@/components/form/CheckBox/CheckBoxBase/CheckBoxBase.module.scss';
import { CheckBoxBaseIF } from '@/components/form/CheckBox/CheckBoxBase/CheckBoxBase.types';
import FieldError from '@/components/form/FieldError/FieldError.component';

const CheckBoxBase: FC<CheckBoxBaseIF> = ({
    label,
    name,
    value,
    error,
    isDisabled = false,
    defaultChecked = false,
    className = '',
    onChange,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return;
        setIsChecked(e.target.checked);
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
                    <span className={styles.customCheckBox}>
                        {isChecked && <IoCheckmark />}
                    </span>
                    {label && label}
                </label>
            </div>
            <FieldError message={error} />
        </div>
    );
};

export default CheckBoxBase;
