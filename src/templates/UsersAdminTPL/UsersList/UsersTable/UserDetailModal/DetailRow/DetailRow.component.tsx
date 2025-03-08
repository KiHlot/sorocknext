import { FC } from 'react';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/DetailRow/DetailRow.module.scss';
import { DetailRowPropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/DetailRow/DetailRow.types';

const DetailRow: FC<DetailRowPropsIF> = ({
    label,
    children,
    className = '',
}) => {
    return (
        <div className={`${styles.detailRowWrapper} ${className}`}>
            {label && <div className={styles.label}>{label}:</div>}
            <div className={styles.content}>{children || '-'}</div>
        </div>
    );
};

export default DetailRow;
