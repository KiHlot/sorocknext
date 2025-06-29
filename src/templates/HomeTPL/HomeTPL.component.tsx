import { FC } from 'react';
import { HomeTPLPropsIF } from '@/templates/HomeTPL/HomeTPL.types';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import HomePagePromoSection from '@/components/sections/HomePagePromoSection/HomePagePromoSection.component';

const HomeTPL: FC<HomeTPLPropsIF> = ({ data }) => {
    return (
        <CommonLayout>
            <Content>{data && <HomePagePromoSection data={data} />}</Content>
            <Sidebar>sidebar</Sidebar>
        </CommonLayout>
    );
};

export default HomeTPL;
