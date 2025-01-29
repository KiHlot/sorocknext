'use client';

import { FC, useEffect } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { siteApi } from '@/api/site/site';
import { MainLayoutPropsIF } from '@/layouts/MainLayout/MainLayout.types';
import GlobLoading from '@/components/blocks/GlobLoading/GlobLoading.component';
import Footer from '@/components/sections/Footer/Footer.component';
import Header from '@/components/sections/Header/Header.component';

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
                    {children}
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
