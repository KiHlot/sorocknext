import { FC } from 'react';
import styles from '@/layouts/AdminLayout/AdminLayout.module.scss';
import { AdminLayoutPropsIF } from '@/layouts/AdminLayout/AdminLayout.types';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import AdminMenu from '@/components/menus/AdminMenu/AdminMenu.component';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import Footer from '@/components/sections/Footer/Footer.component';
import Header from '@/components/sections/Header/Header.component';

const AdminLayout: FC<AdminLayoutPropsIF> = ({ children }) => (
    <>
        <Header />
        <MainWrapper className={styles.adminLayoutWrapper}>
            <div className={`cvscroll ${styles.menu}`}>
                <LeftMenu />
            </div>
            <div className={`cvscroll ${styles.menu}`}>
                <AdminMenu />
            </div>
            <div>{children}</div>
        </MainWrapper>
        <Footer />
    </>
);

export default AdminLayout;
