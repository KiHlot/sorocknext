'use client';

import { FC, useRef, useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Block from '@/components/blocks/Block/Block.component';
import LatestPostCard from '@/components/cards/LatestPostCard/LatestPostCard.component';
import {
    LATEST_POSTS_COPY,
    LATEST_POSTS_TITLE_ID,
    getLatestPostsSlideLabel,
} from '@/components/widgets/LatestPostsWidget/LatestPostsWidget.config';
import styles from '@/components/widgets/LatestPostsWidget/LatestPostsWidget.module.scss';
import { LatestPostsWidgetPropsIF } from '@/components/widgets/LatestPostsWidget/LatestPostsWidget.types';

const LatestPostsWidget: FC<LatestPostsWidgetPropsIF> = ({
    items,
    postType,
}) => {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSwiper = (swiper: SwiperInstance): void => {
        swiperRef.current = swiper;
    };

    const handleSlideChange = (swiper: SwiperInstance): void => {
        setActiveIndex(swiper.activeIndex);
    };

    const handleSelectSlide = (index: number): void => {
        swiperRef.current?.slideTo(index);
    };

    return (
        <Block>
            <h2 id={LATEST_POSTS_TITLE_ID} className={styles.title}>
                {LATEST_POSTS_COPY.title}
            </h2>
            <div
                className={styles.slider}
                role="region"
                aria-labelledby={LATEST_POSTS_TITLE_ID}
            >
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    watchOverflow
                    onSwiper={handleSwiper}
                    onSlideChange={handleSlideChange}
                    className={styles.swiper}
                >
                    {items.map((item) => (
                        <SwiperSlide key={item.url} className={styles.slide}>
                            <LatestPostCard
                                postData={item}
                                postType={postType}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {items.length > 1 ? (
                    <div
                        className={styles.dots}
                        role="group"
                        aria-label={LATEST_POSTS_COPY.dotsLabel}
                    >
                        {items.map((item, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={item.url}
                                    type="button"
                                    className={`${styles.dot} ${isActive ? styles.active : ''}`}
                                    aria-label={getLatestPostsSlideLabel(
                                        index,
                                        items.length,
                                    )}
                                    aria-current={isActive ? 'true' : undefined}
                                    onClick={() => {
                                        handleSelectSlide(index);
                                    }}
                                />
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </Block>
    );
};

export default LatestPostsWidget;
