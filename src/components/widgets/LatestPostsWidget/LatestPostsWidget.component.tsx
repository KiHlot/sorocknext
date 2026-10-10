'use client';

import { FC } from 'react';
import LatestPostCard from '@/components/cards/LatestPostCard/LatestPostCard.component';
import {
    LATEST_POSTS_COPY,
    LATEST_POSTS_TITLE_ID,
    getLatestPostsSlideLabel,
} from '@/components/widgets/LatestPostsWidget/LatestPostsWidget.config';
import { LatestPostsWidgetPropsIF } from '@/components/widgets/LatestPostsWidget/LatestPostsWidget.types';
import SidebarSlider from '@/components/widgets/SidebarSlider/SidebarSlider.component';

const LatestPostsWidget: FC<LatestPostsWidgetPropsIF> = ({
    items,
    postType,
}) => (
    <SidebarSlider
        title={LATEST_POSTS_COPY.title}
        titleId={LATEST_POSTS_TITLE_ID}
        dotsLabel={LATEST_POSTS_COPY.dotsLabel}
        getSlideLabel={getLatestPostsSlideLabel}
        slides={items.map((item) => ({
            key: item.url,
            content: <LatestPostCard postData={item} postType={postType} />,
        }))}
    />
);

export default LatestPostsWidget;
