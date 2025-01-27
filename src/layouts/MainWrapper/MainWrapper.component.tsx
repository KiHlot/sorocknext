import { FC } from 'react';
import styles from '@/layouts/MainWrapper/MainWrapper.module.scss';
import { MainWrapperPropsIF } from '@/layouts/MainWrapper/MainWrapper.types';

const MainWrapper: FC<MainWrapperPropsIF> = ({ children, className = '' }) => {
    return (
        <div className={`${styles.mainWrapper} ${className}`}>{children}</div>
    );
};

export default MainWrapper;
