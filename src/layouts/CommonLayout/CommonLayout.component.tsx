import { FC } from 'react';
import styles from '@/layouts/CommonLayout/CommonLayout.module.scss';
import {
    CommonLayoutContentPropsIF,
    CommonLayoutPropsIF,
    CommonLayoutSidebarPropsIF,
} from '@/layouts/CommonLayout/CommonLayout.types';
import layoutStyles from '@/layouts/Layout/Layout.module.scss';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import TopMenu from '@/components/menus/TopMenu/TopMenu.component';
import Footer from '@/components/sections/Footer/Footer.component';

const CommonLayout: FC<CommonLayoutPropsIF> = ({ children }) => {
    return (
        <>
            <TopMenu />
            <MainWrapper
                className={`${layoutStyles.layout} ${styles.mainWrapperLayout}`}
            >
                <div className={styles.menu}>
                    <LeftMenu />
                </div>
                {children}
            </MainWrapper>
            <Footer />
        </>
    );
};

export const Content: FC<CommonLayoutContentPropsIF> = ({
    children,
    className = '',
}) => {
    return (
        <div className={`flcol ${styles.content} ${className}`}>{children}</div>
    );
};

export const Sidebar: FC<CommonLayoutSidebarPropsIF> = ({ children }) => {
    return <div className={styles.content}>{children}</div>;
};

export default CommonLayout;
