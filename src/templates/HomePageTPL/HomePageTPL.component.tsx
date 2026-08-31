import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import LastNewsPromoSection from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.component';
import LoginWidget from '@/components/widgets/LoginWidget/LoginWidget.component';
import { HomePageTPLPropsIF } from '@/templates/HomePageTPL/HomePageTPL.types';

const HomePageTPL: FC<HomePageTPLPropsIF> = ({ data }) => {
    const { lastNewsPromoData } = data || {};

    return (
        <CommonLayout>
            <Content>
                {!!lastNewsPromoData?.length && (
                    <LastNewsPromoSection
                        lastNewsPromoData={lastNewsPromoData}
                    />
                )}
            </Content>
            <Sidebar>
                <LoginWidget />
            </Sidebar>
        </CommonLayout>
    );
};

export default HomePageTPL;
