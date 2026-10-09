import { FC } from 'react';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import LastNewsPromoSection from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.component';
import RockDatesSection from '@/components/sections/RockDatesSection/RockDatesSection.component';
import TopAlbumsSection from '@/components/sections/TopAlbumsSection/TopAlbumsSection.component';
import LoginWidget from '@/components/widgets/LoginWidget/LoginWidget.component';
import { HomePageTPLPropsIF } from '@/templates/HomePageTPL/HomePageTPL.types';

const HomePageTPL: FC<HomePageTPLPropsIF> = ({ data }) => {
    const { lastNewsPromoData, calendarDefaultData, topAlbumsListData } =
        data || {};

    return (
        <>
            <Content>
                <LastNewsPromoSection
                    lastNewsPromoData={lastNewsPromoData ?? []}
                />
                <RockDatesSection data={calendarDefaultData} />
                {!!topAlbumsListData?.length && (
                    <TopAlbumsSection data={topAlbumsListData} />
                )}
            </Content>
            <Sidebar>
                <LoginWidget />
            </Sidebar>
        </>
    );
};

export default HomePageTPL;
