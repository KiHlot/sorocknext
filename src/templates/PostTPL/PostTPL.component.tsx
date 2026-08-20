import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import PostContentSection from '@/components/sections/PostContentSection/PostContentSection.component';
import SinglePostPromoSection from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.component';
import { PostTPLPropsIF } from '@/templates/PostTPL/PostTPL.types';

const PostTPL: FC<PostTPLPropsIF> = ({ data }) => {
    const { postBase } = data;

    return (
        <CommonLayout>
            <Content>
                <SinglePostPromoSection postBase={postBase} />
                <PostContentSection content={postBase.main.content} />
            </Content>
            <Sidebar>sidebar</Sidebar>
        </CommonLayout>
    );
};

export default PostTPL;
