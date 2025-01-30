import { FC } from 'react';
import styles from '@/components/blocks/GlobLoading/GlobLoading.module.scss';
import { GlobLoadingPropsIF } from '@/components/blocks/GlobLoading/GlobLoading.types';

const GlobLoading: FC<GlobLoadingPropsIF> = ({className=''}) => {
    return (
        <div className={`flc ${styles.globLoadingWrapper} ${className}`}>
            <div className={styles.loader} />
        </div>
    );
};

export default GlobLoading;
