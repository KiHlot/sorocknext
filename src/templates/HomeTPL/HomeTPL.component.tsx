import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import LastNewsPromoWidget from '@/components/widgets/LastNewsPromoWidget/LastNewsPromoWidget.component';

const HomeTPL: FC = () => {
    return (
        <CommonLayout>
            <Content>
                <LastNewsPromoWidget />
            </Content>
            <Sidebar>sidebar</Sidebar>
        </CommonLayout>
    );
};

export default HomeTPL;
