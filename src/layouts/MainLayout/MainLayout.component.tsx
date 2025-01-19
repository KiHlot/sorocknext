import { FC } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { MainLayoutPropsIF } from '@/layouts/MainLayout/MainLayout.types';
import StoreProvider from '@/app/StoreProvider';
import Footer from '@/components/main/Footer/Footer.component';
import Header from '@/components/main/Header/Header.component';

const MainLayout: FC<MainLayoutPropsIF> = ({ children }) => {
    return (
        <StoreProvider>
            <Header />
            {children}
            <Footer />
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
        </StoreProvider>
    );
};

export default MainLayout;
