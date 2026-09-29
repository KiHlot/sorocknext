import { FC } from 'react';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import LastNewsPromoSection from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.component';
import RockDatesSection from '@/components/sections/RockDatesSection/RockDatesSection.component';
import TopAlbomsSection from '@/components/sections/TopAlbomsSection/TopAlbomsSection.component';
import LoginWidget from '@/components/widgets/LoginWidget/LoginWidget.component';
import { HomePageTPLPropsIF } from '@/templates/HomePageTPL/HomePageTPL.types';

const HomePageTPL: FC<HomePageTPLPropsIF> = ({ data }) => {
    const { lastNewsPromoData, calendarDefaultData, topAlbomsListData } =
        data || {};

    return (
        <>
            <Content>
                <RockDatesSection data={calendarDefaultData} />
                {!!lastNewsPromoData?.length && (
                    <LastNewsPromoSection
                        lastNewsPromoData={lastNewsPromoData}
                    />
                )}
                {!!topAlbomsListData?.length && (
                    <TopAlbomsSection data={topAlbomsListData} />
                )}
            </Content>
            <Sidebar>
                <LoginWidget />
            </Sidebar>
        </>
    );
};

export default HomePageTPL;
