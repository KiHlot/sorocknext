import { ChangeEvent, ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import CheckBoxBase from '@/components/controls/CheckBox/CheckBoxBase/CheckBoxBase.component';
import styles from '@/components/controls/CheckBoxGroup/CheckBoxGroup.module.scss';
import { CheckBoxGroupPropsIF } from '@/components/controls/CheckBoxGroup/CheckBoxGroup.types';

export const CheckBoxGroup = <T extends FieldValues>({
    isDisabled,
    name,
    control,
    className = '',
    options,
}: CheckBoxGroupPropsIF<T>): ReactElement => {
    const {
        field: { value, onChange },
    } = useController({ name, control });

    const selectedValues: string[] = Array.isArray(value) ? value : [];

    const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, checked } = event.target;

        onChange(
            checked
                ? [...selectedValues, id]
                : selectedValues.filter((v) => v !== id),
        );
    };

    return (
        <div
            className={`flcol ${styles.checkBoxGroupGroupWrapper} ${className}`}
        >
            {options.map(({ label, value: optionValue }) => (
                <CheckBoxBase
                    key={optionValue}
                    name={optionValue}
                    label={label}
                    isChecked={selectedValues.includes(optionValue)}
                    onChange={changeHandler}
                    isDisabled={isDisabled}
                />
            ))}
        </div>
    );
};

export default CheckBoxGroup;
