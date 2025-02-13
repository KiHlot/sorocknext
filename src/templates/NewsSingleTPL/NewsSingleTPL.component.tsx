import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import PostContentSection from '@/components/sections/PostContentSection/PostContentSection.component';
import SinglePostPromoSection from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.component';
import { NewsSingleTPLPropsIF } from '@/templates/NewsSingleTPL/NewsSingleTPL.types';

const NewsSingleTPL: FC<NewsSingleTPLPropsIF> = ({ data }) => {
    return (
        <CommonLayout>
            <Content>
                <SinglePostPromoSection data={data?.promoSection} />
                <PostContentSection content={data?.content} />
            </Content>
            <Sidebar>sidebar</Sidebar>
        </CommonLayout>
    );
};

export default NewsSingleTPL;
