import { FC } from 'react';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Block from '@/components/blocks/Block/Block.component';
import PostContentSection from '@/components/sections/PostContentSection/PostContentSection.component';
import PostMusicSection from '@/components/sections/PostMusicSection/PostMusicSection.component';
import PostVideoSection from '@/components/sections/PostVideoSection/PostVideoSection.component';
import SinglePostPromoSection from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.component';
import LatestPostsWidget from '@/components/widgets/LatestPostsWidget/LatestPostsWidget.component';
import { getLatestSidebarPosts } from '@/components/widgets/LatestPostsWidget/LatestPostsWidget.helpers';
import PopularTagsWidget from '@/components/widgets/PopularTagsWidget/PopularTagsWidget.component';
import TaxonomyTermsWidget from '@/components/widgets/TaxonomyTermsWidget/TaxonomyTermsWidget.component';
import { getTaxonomySidebarTerms } from '@/components/widgets/TaxonomyTermsWidget/TaxonomyTermsWidget.helpers';
import styles from '@/templates/PostTPL/PostTPL.module.scss';
import { PostTPLPropsIF } from '@/templates/PostTPL/PostTPL.types';

const PostTPL: FC<PostTPLPropsIF> = ({
    data,
    latestPosts,
    pathname,
    postType,
}) => {
    const { postBase } = data;
    const videos = (postBase.video ?? []).filter((item) =>
        Boolean(item.videoCode?.trim()),
    );
    const music = postBase.music;
    const taxonomyTerms = getTaxonomySidebarTerms(postType, data.taxonomyTerms);
    const latestSidebarPosts = getLatestSidebarPosts(latestPosts, pathname);

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
            <Sidebar>
                {latestSidebarPosts.length > 0 ? (
                    <LatestPostsWidget
                        items={latestSidebarPosts}
                        postType={postType}
                    />
                ) : null}
                {taxonomyTerms ? (
                    <Block>
                        <TaxonomyTermsWidget
                            title={taxonomyTerms.title}
                            items={taxonomyTerms.items}
                        />
                    </Block>
                ) : null}
                <Block>
                    <h2 className={styles.title}>Популярные теги</h2>
                    <PopularTagsWidget />
                </Block>
            </Sidebar>
        </>
    );
};

export default PostTPL;
