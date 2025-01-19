import { FC } from 'react';
import { MainLayoutPropsIF } from '@/layouts/MainLayout/MainLayout.types';
import Footer from '@/components/main/Footer/Footer.component';
import Header from '@/components/main/Header/Header.component';

const MainLayout: FC<MainLayoutPropsIF> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default MainLayout;
