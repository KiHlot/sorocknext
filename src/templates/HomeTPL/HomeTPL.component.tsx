import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import { HomeTPLPropsIF } from '@/templates/HomeTPL/HomeTPL.types';

const HomeTPL: FC<HomeTPLPropsIF> = ({ props }) => {
    const temp = 'remove_this';

    return (
        <CommonLayout>
            <Content>content</Content>
            <Sidebar>sidebar</Sidebar>
        </CommonLayout>
    );
};

export default HomeTPL;
