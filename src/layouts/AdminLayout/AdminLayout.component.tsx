import { FC } from 'react';
import styles from '@/layouts/AdminLayout/AdminLayout.module.scss';
import { AdminLayoutPropsIF } from '@/layouts/AdminLayout/AdminLayout.types';
import layoutStyles from '@/layouts/Layout/Layout.module.scss';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import Loading from '@/components/blocks/Loading/Loading.component';
import AdminMenu from '@/components/menus/AdminMenu/AdminMenu.component';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import TopMenu from '@/components/menus/TopMenu/TopMenu.component';
import Footer from '@/components/sections/Footer/Footer.component';

const AdminLayout: FC<AdminLayoutPropsIF> = ({ children, isLoading }) => {
    return (
        <>
            <TopMenu />
            <MainWrapper
                className={`${layoutStyles.layout} ${styles.adminLayoutWrapper}`}
            >
                <div className={`cvscroll ${layoutStyles.menu}`}>
                    <LeftMenu />
                </div>
                <div className={`cvscroll ${layoutStyles.menu}`}>
                    <AdminMenu />
                </div>
                {/*//TODO css*/}
                <div className={styles.contnet}>
                    {isLoading ? <Loading height={800} /> : children}
                </div>
            </MainWrapper>
            <Footer />
        </>
    );
};

export default AdminLayout;
