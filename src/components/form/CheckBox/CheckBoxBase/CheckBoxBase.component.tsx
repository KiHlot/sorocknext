import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import styles from '@/components/form/CheckBox/CheckBoxBase/CheckBoxBase.module.scss';
import { CheckBoxBaseIF } from '@/components/form/CheckBox/CheckBoxBase/CheckBoxBase.types';
import FieldError from '@/components/form/FieldError/FieldError.component';

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
    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return;
        setChecked(e.target.checked);
        onChange?.(e);
    };

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    return (
        <div className={`${styles.inputBlock} ${className}`}>
            <div className={styles.checkBoxBaseWrapper}>
                <label className={styles.checkBoxLabel} htmlFor={name}>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        id={name}
                        checked={checked}
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
