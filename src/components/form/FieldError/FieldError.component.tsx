import { FC } from 'react';
import styles from '@/components/form/FieldError/FieldError.module.scss';
import { FieldErrorPropsIF } from '@/components/form/FieldError/FieldError.types';

const FieldError: FC<FieldErrorPropsIF> = ({ message }) => {
    return message ? (
        <div className={styles.fieldErrorWrapper}>{message}</div>
    ) : null;
};

export default FieldError;
