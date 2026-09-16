import { FC } from 'react';
import styles from '@/layouts/CommonLayout/CommonLayout.module.scss';
import { CommonPropsIF } from '@/layouts/CommonLayout/CommonLayout.types';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import Footer from '@/components/sections/Footer/Footer.component';
import Header from '@/components/sections/Header/Header.component';

const CommonLayout: FC<CommonPropsIF> = ({ children }) => (
    <>
        <Header />
        <MainWrapper className={styles.commonLayoutWrapper}>
            <aside className={styles.menu}>
                <LeftMenu />
            </aside>
            {children}
        </MainWrapper>
        <Footer />
    </>
);

export const Content: FC<CommonPropsIF> = ({ children, className = '' }) => (
    <main className={`flcol gapLayout ${styles.content} ${className}`}>
        {children}
    </main>
);

export const Sidebar: FC<CommonPropsIF> = ({ children }) => (
    <aside className="flcol gapLayout">{children}</aside>
);

export default CommonLayout;
