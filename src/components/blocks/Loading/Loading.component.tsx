import { FC } from 'react';
import styles from '@/components/blocks/Loading/Loading.module.scss';
import { LoadingPropsIF } from '@/components/blocks/Loading/Loading.types';

const Loading: FC<LoadingPropsIF> = ({ width, height, className = '' }) => {
    return (
        <div
            className={`flc ${styles.loadingWrapper} ${className}`}
            style={{
                width: width ? `${width}px` : '100%',
                height: height ? `${height}px` : '300px',
            }}
        >
            <div className={styles.loader} />
        </div>
    );
};

export default Loading;
