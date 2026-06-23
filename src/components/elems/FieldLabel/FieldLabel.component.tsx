import { FC } from 'react';
import styles from '@/components/elems/FieldLabel/FieldLabel.module.scss';
import { FieldLabelPropsIF } from '@/components/elems/FieldLabel/FieldLabel.types';

const FieldLabel: FC<FieldLabelPropsIF> = ({ label, isRequired, isError }) =>
    label ? (
        <div
            className={`${styles.fieldLabelWrapper} ${isError ? styles.error : ''}`}
        >
            {label}
            {isRequired && <span>*</span>}
        </div>
    ) : null;

export default FieldLabel;
