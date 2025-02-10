'use client';

import { FC, useEffect } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { siteApi } from '@/api/site/site';
import styles from '@/layouts/MainLayout/MainLayout.module.scss';
import { MainLayoutPropsIF } from '@/layouts/MainLayout/MainLayout.types';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import Loading from '@/components/blocks/Loading/Loading.component';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import TopMenu from '@/components/menus/TopMenu/TopMenu.component';
import Footer from '@/components/sections/Footer/Footer.component';

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
                <Loading />
            ) : (
                <>
                    <TopMenu />
                    <MainWrapper>
                        <div className={styles.mainLayoutWrapper}>
                            <div className={styles.menu}>
                                <LeftMenu />
                            </div>
                            <div className={styles.content}>{children}</div>
                            <div className={styles.sidebar}>sidebar</div>
                        </div>
                    </MainWrapper>
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
