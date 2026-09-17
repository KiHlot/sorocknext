import { FC } from 'react';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import PostArchiveCard from '@/components/cards/PostArchiveCard/PostArchiveCard.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import { NewsArchiveTPLPropsIF } from '@/templates/NewsArchiveTPL/NewsArchiveTPL.types';

const NewsArchiveTPL: FC<NewsArchiveTPLPropsIF> = ({ data }) => (
    <>
        <Content>
            <Breadcrumbs />
            <div className="flcol gapBlock">
                {data?.postsData?.map((postData, index) => (
                    <PostArchiveCard key={index} postData={postData} />
                ))}
            </div>
        </Content>
        <Sidebar>sidebar</Sidebar>
    </>
);

export default NewsArchiveTPL;
