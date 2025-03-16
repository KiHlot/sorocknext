import { FC } from 'react';
import styles from '@/components/form/FieldError/FieldError.module.scss';
import { FieldErrorPropsIF } from '@/components/form/FieldError/FieldError.types';

const FieldError: FC<FieldErrorPropsIF> = ({ message, className = '' }) => {
    return message ? (
        <div className={`${styles.fieldErrorWrapper} ${className}`}>
            {message}
        </div>
    ) : null;
};

export default FieldError;
