import { FC } from 'react';
import { useController, UseControllerProps } from '~/react-hook-form';
import { CheckBoxProps } from '@/components/form/CheckBox/CheckBox.types';
import CheckBoxBase from '@/components/form/CheckBox/CheckBoxBase/CheckBoxBase.component';

const CheckBox: FC<UseControllerProps & CheckBoxProps> = ({
    label,
    isDisabled,
    className,
    backError,
    ...props
}) => {
    const {
        field: { name, value, onChange, onBlur },
        fieldState,
    } = useController(props);

    return (
        <CheckBoxBase
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message || backError}
            isChecked={!!value}
            isDisabled={isDisabled}
            className={className}
        />
    );
};

export default CheckBox;
