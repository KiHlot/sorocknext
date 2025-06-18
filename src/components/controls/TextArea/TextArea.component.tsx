import { ReactElement } from 'react';
import { FieldValues, useController } from '~/react-hook-form';
import styles from '@/components/controls/TextArea/TextArea.module.scss';
import { TextAreaPropsIF } from '@/components/controls/TextArea/TextArea.types';
import FieldError from '@/components/elems/FieldError/FieldError.component';
import FieldLabel from '@/components/elems/FieldLabel/FieldLabel.component';

export const TextArea = <T extends FieldValues>({
    control,
    label,
    name,
    backError,
    placeholder,
    isDisabled,
    maxLength,
    className,
    isRequired,
}: TextAreaPropsIF<T>): ReactElement => {
    const {
        field: { value, onChange },
        fieldState,
    } = useController({ name, control });

    return (
        <div className={`${styles.textAreaBlock} ${className}`}>
            <FieldLabel
                label={label}
                isRequired={isRequired}
                isError={!!fieldState.error?.message}
            />
            <div className={styles.textAreaWrapper}>
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    maxLength={maxLength}
                    autoComplete={name}
                    className={fieldState.error?.message ? styles.error : ''}
                />
            </div>
            <FieldError message={fieldState.error?.message || backError} />
        </div>
    );
};

export default TextArea;
