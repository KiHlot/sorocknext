"use client";
import { FC, ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import ClientModule from "@/layouts/ClientModule/ClientModule.component";
import Header from "@/components/Header/Header.component";
import Footer from "@/components/Footer/Footer.component";
import { createStore } from "@/store";
import { TopMenuVerticalSliderItemType } from "@/components/Header/TopMenu/TopMenuVerticalSlider/TopMenuVerticalSlider.types";
import { TagThumbIF } from "@/types/post";

const store = createStore();

interface MainLayoutProps {
  children?: ReactNode;
  data: {
    topMenuVerticalSliderData?: TopMenuVerticalSliderItemType[];
    popularTags?: TagThumbIF[];
  };
}

const MainLayout: FC<MainLayoutProps> = ({ children, data }) => {
  const [isShowConventicle, setIsShowConventicle] = useState<boolean>(true);
  return (
    //TODO сделать активацию при подтв пароля
    <Provider store={store}>
      <SessionProvider>
        <ClientModule
          setIsShowConventicle={setIsShowConventicle}
          isShowConventicle={isShowConventicle}
        />
        {isShowConventicle && (
          <Header topMenuVerticalSliderData={data.topMenuVerticalSliderData} />
        )}
        {children}
        {isShowConventicle && <Footer popularTags={data.popularTags} />}
      </SessionProvider>
    </Provider>
  );
};

export default MainLayout;
