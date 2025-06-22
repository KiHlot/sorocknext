import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import HomePagePromoSection from '@/components/sections/HomePagePromoSection/HomePagePromoSection.component';

const HomeTPL: FC = () => {
    return (
        <CommonLayout>
            <Content>
                <HomePagePromoSection data={{}} />
            </Content>
            <Sidebar>sidebar</Sidebar>
        </CommonLayout>
    );
};

export default HomeTPL;
