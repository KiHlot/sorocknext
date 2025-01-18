// import { Provider } from "react-redux";
// import { SessionProvider } from "next-auth/react";
// import ClientModule from "@/layouts/ClientModule/ClientModule.component";
import Header from '@/components/main/Header/Header.component';
import { MainLayoutPropsIF } from '@/layouts/MainLayout/MainLayout.types';
import { FC } from 'react';

// import Footer from "@/components/Footer/Footer.component";
// import { createStore } from "@/store";
// import { TopMenuVerticalSliderItemType } from "@/components/Header/TopMenu/TopMenuVerticalSlider/TopMenuVerticalSlider.types";
// import { TagThumbIF } from "@/types/post";

// const store = createStore();
//
// interface MainLayoutProps {
//   children?: ReactNode;
//   data: {
//     topMenuVerticalSliderData?: TopMenuVerticalSliderItemType[];
//     popularTags?: TagThumbIF[];
//   };
// }

const MainLayout: FC<MainLayoutPropsIF> = ({ children }) => {
    return (
        <>
            {/*<ClientModule*/}
            {/*  setIsShowConventicle={setIsShowConventicle}*/}
            {/*  isShowConventicle={isShowConventicle}*/}
            {/*/>*/}
            {/*{isShowConventicle && (*/}
            <Header
                // topMenuVerticalSliderData={data.topMenuVerticalSliderData}
            />
            {/*)}*/}
            {children}
            {/*{isShowConventicle && <Footer popularTags={data.popularTags} />}*/}
        </>
    );
};

export default MainLayout;
