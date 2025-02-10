import { FC } from 'react';
import styles from '@/components/blocks/Loading/Loading.module.scss';
import { LoadingPropsIF } from '@/components/blocks/Loading/Loading.types';

const Loading: FC<LoadingPropsIF> = ({className=''}) => {
    return (
        <div className={`flc ${styles.loadingWrapper} ${className}`}>
            <div className={styles.loader} />
        </div>
    );
};

export default Loading;
