import { FC } from 'react';
import styles from '@/layouts/AdminLayout/AdminLayout.module.scss';
import { AdminLayoutPropsIF } from '@/layouts/AdminLayout/AdminLayout.types';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import Loading from '@/components/elems/Loading/Loading.component';
import AdminMenu from '@/components/menus/AdminMenu/AdminMenu.component';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import TopMenu from '@/components/menus/TopMenu/TopMenu.component';
import Footer from '@/components/sections/Footer/Footer.component';

const AdminLayout: FC<AdminLayoutPropsIF> = ({ children, isLoading }) => (
    <>
        <TopMenu />
        <MainWrapper className={styles.adminLayoutWrapper}>
            <div className={`cvscroll ${styles.menu}`}>
                <LeftMenu />
            </div>
            <div className={`cvscroll ${styles.menu}`}>
                <AdminMenu />
            </div>
            <div>{isLoading ? <Loading height={800} /> : children}</div>
        </MainWrapper>
        <Footer />
    </>
);

export default AdminLayout;
