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
                className={`${layoutStyles.layout} ${styles.commonLayoutWrapper}`}
            >
                <aside className={styles.menu}>
                    <LeftMenu />
                </aside>
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
        <main className={`flcol gapLayout ${styles.content} ${className}`}>
            {children}
        </main>
    );
};

export const Sidebar: FC<CommonLayoutSidebarPropsIF> = ({ children }) => {
    return <aside className="flcol gapLayout">{children}</aside>;
};

export default CommonLayout;
