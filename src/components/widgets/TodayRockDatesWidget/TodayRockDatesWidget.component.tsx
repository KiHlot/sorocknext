'use client';

import { FC } from 'react';
import LatestPostCard from '@/components/cards/LatestPostCard/LatestPostCard.component';
import SidebarSlider from '@/components/widgets/SidebarSlider/SidebarSlider.component';
import {
    TODAY_ROCK_DATES_COPY,
    TODAY_ROCK_DATES_TITLE_ID,
    getTodayRockDateSlideLabel,
} from '@/components/widgets/TodayRockDatesWidget/TodayRockDatesWidget.config';
import { TodayRockDatesWidgetPropsIF } from '@/components/widgets/TodayRockDatesWidget/TodayRockDatesWidget.types';

const TodayRockDatesWidget: FC<TodayRockDatesWidgetPropsIF> = ({ items }) => (
    <SidebarSlider
        title={TODAY_ROCK_DATES_COPY.title}
        titleId={TODAY_ROCK_DATES_TITLE_ID}
        dotsLabel={TODAY_ROCK_DATES_COPY.dotsLabel}
        getSlideLabel={getTodayRockDateSlideLabel}
        slides={items.map((event) => ({
            key: event.url,
            content: (
                <LatestPostCard
                    postData={{
                        coverImg: event.coverImg,
                        postDate: event.eventDate,
                        taxonomies: null,
                        titleH1: event.titleH1,
                        url: event.url,
                    }}
                    postType="rock-data"
                />
            ),
        }))}
    />
);

export default TodayRockDatesWidget;
