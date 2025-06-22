'use client';

import { FC, useEffect } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { siteApi } from '@/api/site/site';
import { LayoutPropsIF } from '@/layouts/Layout/Layout.types';

const Layout: FC<LayoutPropsIF> = ({ children }) => {
    const [getBaseData] = siteApi.useGetBaseDataMutation({
        fixedCacheKey: 'baseData',
    });

    useEffect(() => {
        getBaseData();
    }, []);

    return (
        <>
            {children}

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

export default Layout;
