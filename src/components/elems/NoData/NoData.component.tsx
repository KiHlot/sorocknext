import { FC } from 'react';
import styles from '@/components/elems/NoData/NoData.module.scss';
import { NoDataPropsIF } from '@/components/elems/NoData/NoData.types';

const NoData: FC<NoDataPropsIF> = ({ className = '', text = 'Нет данных' }) => (
    <div className={`flc ${styles.noDataWrapper} ${className}`}>{text}</div>
);

export default NoData;
