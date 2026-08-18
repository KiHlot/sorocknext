import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import HomePagePromoSection from '@/components/sections/HomePagePromoSection/HomePagePromoSection.component';
import { HomeTPLPropsIF } from '@/templates/HomeTPL/HomeTPL.types';

const HomeTPL: FC<HomeTPLPropsIF> = ({ data }) => (
    <CommonLayout>
        <Content>{data && <HomePagePromoSection data={data} />}</Content>
        <Sidebar>sidebar</Sidebar>
    </CommonLayout>
);

export default HomeTPL;
