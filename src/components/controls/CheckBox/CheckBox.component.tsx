import { FC } from 'react';
import { useController, UseControllerProps } from '~/react-hook-form';
import { CheckBoxPropsIF } from '@/components/controls/CheckBox/CheckBox.types';
import CheckBoxBase from '@/components/controls/CheckBox/CheckBoxBase/CheckBoxBase.component';

const CheckBox: FC<UseControllerProps & CheckBoxPropsIF> = ({
    label,
    isDisabled,
    className,
    backError,
    ...props
}) => {
    const {
        field: { name, value, onChange },
        fieldState,
    } = useController(props);

    return (
        <CheckBoxBase
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            error={fieldState.error?.message || backError}
            isChecked={!!value}
            isDisabled={isDisabled}
            className={className}
        />
    );
};

export default CheckBox;
