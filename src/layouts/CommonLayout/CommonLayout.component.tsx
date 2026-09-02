import { FC } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import styles from '@/layouts/CommonLayout/CommonLayout.module.scss';
import { CommonPropsIF } from '@/layouts/CommonLayout/CommonLayout.types';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import TopMenu from '@/components/menus/TopMenu/TopMenu.component';
import Footer from '@/components/sections/Footer/Footer.component';

const CommonLayout: FC<CommonPropsIF> = ({ children }) => (
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

export const Content: FC<CommonPropsIF> = ({ children, className = '' }) => (
    <main className={`flcol gapLayout ${styles.content} ${className}`}>
        {children}
    </main>
);

export const Sidebar: FC<CommonPropsIF> = ({ children }) => (
    <aside className="flcol gapLayout">{children}</aside>
);

export default CommonLayout;
