import { FC } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import styles from '@/layouts/CommonLayout/CommonLayout.module.scss';
import {
    CommonLayoutContentPropsIF,
    CommonLayoutPropsIF,
    CommonLayoutSidebarPropsIF,
} from '@/layouts/CommonLayout/CommonLayout.types';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import TopMenu from '@/components/menus/TopMenu/TopMenu.component';
import Footer from '@/components/sections/Footer/Footer.component';

const CommonLayout: FC<CommonLayoutPropsIF> = ({ children }) => (
    <>
        <TopMenu />
        <MainWrapper className={styles.commonLayoutWrapper}>
            <aside className={styles.menu}>
                <LeftMenu />
            </aside>
            {children}
        </MainWrapper>
        <Footer />
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
        />
    </>
);

export const Content: FC<CommonLayoutContentPropsIF> = ({
    children,
    className = '',
}) => (
    <main className={`flcol gapLayout ${styles.content} ${className}`}>
        {children}
    </main>
);

export const Sidebar: FC<CommonLayoutSidebarPropsIF> = ({ children }) => (
    <aside className="flcol gapLayout">{children}</aside>
);

export default CommonLayout;
