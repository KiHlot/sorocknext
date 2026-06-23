import { FC } from 'react';
import styles from '@/components/elems/FieldError/FieldError.module.scss';
import { FieldErrorPropsIF } from '@/components/elems/FieldError/FieldError.types';

const FieldError: FC<FieldErrorPropsIF> = ({ message, className = '' }) =>
    message ? (
        <div className={`${styles.fieldErrorWrapper} ${className}`}>
            {message}
        </div>
    ) : null;

export default FieldError;
