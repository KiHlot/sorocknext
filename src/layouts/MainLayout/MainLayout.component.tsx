'use client';

import { FC, useEffect } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { siteApi } from '@/api/site/site';
import styles from '@/layouts/MainLayout/MainLayout.module.scss';
import { MainLayoutPropsIF } from '@/layouts/MainLayout/MainLayout.types';
import GlobLoading from '@/components/blocks/GlobLoading/GlobLoading.component';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import Footer from '@/components/sections/Footer/Footer.component';
import TopMenu from '@/components/menus/TopMenu/TopMenu.component';

const MainLayout: FC<MainLayoutPropsIF> = ({ children }) => {
    const [getBaseData, { isLoading }] = siteApi.useGetBaseDataMutation({
        fixedCacheKey: 'baseData',
    });

    useEffect(() => {
        getBaseData();
    }, []);

    return (
        <>
            {isLoading ? (
                <GlobLoading />
            ) : (
                <>
                    <TopMenu />
                    <div className={styles.mainLayoutWrapper}>
                        <div className={styles.menu}>
                            <LeftMenu />
                        </div>
                        <div className={styles.content}>{children}</div>
                        <div className={styles.sidebar}>sidebar</div>
                    </div>
                    <Footer />
                </>
            )}

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
};

export default MainLayout;
