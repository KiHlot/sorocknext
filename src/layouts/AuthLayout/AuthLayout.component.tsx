import { FC } from 'react';
import Link from '~/next/link';
import { IoArrowBackOutline } from '~/react-icons/io5';
import thumbBg from '@/images/img/thumb_bg.jpg';
import styles from '@/layouts/AuthLayout/AuthLayout.module.scss';
import { AuthLayoutPropsIF } from '@/layouts/AuthLayout/AuthLayout.types';
import layoutStyles from '@/layouts/Layout/Layout.module.scss';

const AuthLayout: FC<AuthLayoutPropsIF> = ({ children }) => {
    return (
        <div className={`${styles.authLayout} ${layoutStyles.layout}`}>
            <div className={styles.leftSide} />
            <div className={`flcol gapLayout ${styles.content}`}>
                <Link href={'/'} className={styles.backButton}>
                    <IoArrowBackOutline />
                    На главную
                </Link>
                {children}
            </div>
            <div
                className={`bgc ${styles.thumb}`}
                style={{
                    backgroundImage: `linear-gradient(
        		to left,
        		rgba(27, 32, 38, 0.4),
        		rgba(27, 32, 38, 1)), url(${thumbBg.src}`,
                }}
            />
        </div>
    );
};

export default AuthLayout;
