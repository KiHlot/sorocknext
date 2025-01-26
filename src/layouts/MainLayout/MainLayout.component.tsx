'use client';

import { FC, useEffect } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { siteApi } from '@/api/site/site';
import { MainLayoutPropsIF } from '@/layouts/MainLayout/MainLayout.types';
import PageLayout from '@/layouts/PageLayout/PageLayout.component';
import Footer from '@/components/main/Footer/Footer.component';
import Header from '@/components/main/Header/Header.component';
import GlobLoading from '@/components/main/Loading/Loading.component';

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
                    <Header />
                    <PageLayout>{children}</PageLayout>
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
