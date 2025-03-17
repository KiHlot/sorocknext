import { FC } from 'react';
import styles from '@/components/elems/NoData/NoData.module.scss';
import { NoDataPropsIF } from '@/components/elems/NoData/NoData.types';

const NoData: FC<NoDataPropsIF> = ({ className = '' }) => {
    return (
        <div className={`flc ${styles.noDataWrapper} ${className}`}>
            Нет данных
        </div>
    );
};

export default NoData;
