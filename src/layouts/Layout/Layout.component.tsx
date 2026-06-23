'use client';

import { FC } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { LayoutPropsIF } from '@/layouts/Layout/Layout.types';

const Layout: FC<LayoutPropsIF> = ({ children }) => (
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

export default Layout;
