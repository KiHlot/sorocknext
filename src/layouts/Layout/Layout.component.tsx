'use client';

import { FC, useEffect } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { siteApi } from '@/api/site/site';
import { usersApi } from '@/api/users/users';
import { getCookie, setStorageItem } from '@/helpers/utils';
import { LayoutPropsIF } from '@/layouts/Layout/Layout.types';
import { useLogout } from '@/hooks/useLogout';

const Layout: FC<LayoutPropsIF> = ({ children }) => {
    const [getBaseData] = siteApi.useGetBaseDataMutation({
        fixedCacheKey: 'baseData',
    });
    const [getProfileData] = usersApi.useLazyGetProfileDataQuery();

    const checkAuth = async () => {
        if (typeof window === 'undefined') return null;

        if (!getCookie('token')) {
            sessionStorage.removeItem('profileData');
            return;
        }

        getProfileData()
            .unwrap()
            .then(({ result, data }) => {
                if (result == 'ok') {
                    data ? setStorageItem(data, 'profileData') : useLogout();
                }
            });
    };

    useEffect(() => {
        getBaseData();
        checkAuth();
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
