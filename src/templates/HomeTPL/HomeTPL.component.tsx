import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';

const HomeTPL: FC = () => {
    return (
        <CommonLayout>
            <Content>content</Content>
            <Sidebar>sidebar</Sidebar>
        </CommonLayout>
    );
};

export default HomeTPL;
