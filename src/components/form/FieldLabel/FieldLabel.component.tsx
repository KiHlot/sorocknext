import { FC } from 'react';
import styles from '@/components/form/FieldLabel/FieldLabel.module.scss';
import { FieldLabelPropsIF } from '@/components/form/FieldLabel/FieldLabel.types';

const FieldLabel: FC<FieldLabelPropsIF> = ({ label, isRequired }) => {
    return label ? (
        <div className={styles.fieldLabelWrapper}>
            {label}
            {isRequired && <span>*</span>}
        </div>
    ) : null;
};

export default FieldLabel;
