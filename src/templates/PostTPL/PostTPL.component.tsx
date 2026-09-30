import { FC } from 'react';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import PostContentSection from '@/components/sections/PostContentSection/PostContentSection.component';
import PostMusicSection from '@/components/sections/PostMusicSection/PostMusicSection.component';
import PostVideoSection from '@/components/sections/PostVideoSection/PostVideoSection.component';
import SinglePostPromoSection from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.component';
import { PostTPLPropsIF } from '@/templates/PostTPL/PostTPL.types';

const PostTPL: FC<PostTPLPropsIF> = ({ data, pathname }) => {
    const { postBase } = data;
    const videos = (postBase.video ?? []).filter((item) =>
        Boolean(item.videoCode?.trim()),
    );
    const music = postBase.music;

    return (
        <>
            <Content>
                <article
                    className="flcol gapLayout"
                    itemScope
                    itemType="https://schema.org/Article"
                >
                    <SinglePostPromoSection
                        postBase={postBase}
                        pathname={pathname}
                    />
                    {videos.length > 0 ? (
                        <PostVideoSection videos={videos} />
                    ) : null}
                    {music && music.musicCode.trim() ? (
                        <PostMusicSection music={music} />
                    ) : null}
                    <PostContentSection content={postBase.main.content} />
                </article>
            </Content>
            <Sidebar>sidebar</Sidebar>
        </>
    );
};

export default PostTPL;
