import { FC } from 'react';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import PostContentSection from '@/components/sections/PostContentSection/PostContentSection.component';
import SinglePostPromoSection from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.component';
import { PostTPLPropsIF } from '@/templates/PostTPL/PostTPL.types';

const PostTPL: FC<PostTPLPropsIF> = ({ data, pathname }) => {
    const { postBase } = data;

    return (
        <>
            <Content>
                <SinglePostPromoSection
                    postBase={postBase}
                    pathname={pathname}
                />
                <PostContentSection content={postBase.main.content} />
            </Content>
            <Sidebar>sidebar</Sidebar>
        </>
    );
};

export default PostTPL;
