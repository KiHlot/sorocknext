import { FC } from 'react';
import styles from '@/components/main/Pagination/PaginationButton/PaginationButton.module.scss';
import { PaginationButtonPropsIF } from '@/components/main/Pagination/PaginationButton/PaginationButton.types';

const PaginationButton: FC<PaginationButtonPropsIF> = ({
    data,
    className = '',
}) => {
    const temp = 'remove_this';

    return (
        <div className={`${styles.PaginationButtonWrapper} ${className}`}>
            {data.label}
        </div>
    );
};

export default PaginationButton;
