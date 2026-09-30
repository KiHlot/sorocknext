'use client';

import { FC, MouseEvent, useRef, useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/controls/Button/Button.component';
import SliderArrow from '@/components/sections/RockDatesSection/SliderArrow/SliderArrow.component';
import { TOP_ALBUMS_LABELS } from '@/components/sections/TopAlbumsSection/TopAlbumsSection.config';
import styles from '@/components/sections/TopAlbumsSection/TopAlbumsTabs/TopAlbumsTabs.module.scss';
import { TopAlbumsTabsPropsIF } from '@/components/sections/TopAlbumsSection/TopAlbumsTabs/TopAlbumsTabs.types';

interface ScrollStateIF {
    isLocked: boolean;
    isBeginning: boolean;
    isEnd: boolean;
}

const TopAlbumsTabs: FC<TopAlbumsTabsPropsIF> = ({
    tabs,
    activeIndex,
    baseId,
    onSelectTab,
}) => {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [scrollState, setScrollState] = useState<ScrollStateIF>({
        isLocked: true,
        isBeginning: true,
        isEnd: true,
    });

    const syncScrollState = (swiper: SwiperInstance): void => {
        setScrollState({
            isLocked: swiper.isLocked,
            isBeginning: swiper.isBeginning,
            isEnd: swiper.isEnd,
        });
    };

    const handleSwiper = (swiper: SwiperInstance): void => {
        swiperRef.current = swiper;
        syncScrollState(swiper);
    };

    const handlePrev = (): void => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = (): void => {
        swiperRef.current?.slideNext();
    };

    const handleSelectTab = (event: MouseEvent<HTMLButtonElement>): void => {
        const tabIndex = Number(event.currentTarget.dataset.index);

        if (!Number.isInteger(tabIndex)) {
            return;
        }

        onSelectTab(tabIndex);
    };

    return (
        <div className={styles.tabs}>
            <Swiper
                slidesPerView="auto"
                spaceBetween={24}
                watchOverflow
                onSwiper={handleSwiper}
                onSlideChange={syncScrollState}
                onResize={syncScrollState}
                onReachBeginning={syncScrollState}
                onReachEnd={syncScrollState}
                className={styles.swiper}
                role="tablist"
                aria-label={TOP_ALBUMS_LABELS.tabs}
            >
                {tabs.map((tab, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <SwiperSlide key={tab} className={styles.slide}>
                            <Button
                                isCustom
                                id={`${baseId}-tab-${index}`}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`${baseId}-panel`}
                                className={`${styles.tab} ${isActive ? styles.active : ''}`}
                                data-index={index}
                                clickHandler={handleSelectTab}
                                dataTest={`top_albums_tab_${index}`}
                            >
                                {tab}
                            </Button>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            {!scrollState.isLocked && (
                <div className={styles.arrows}>
                    <SliderArrow
                        direction="prev"
                        ariaLabel={TOP_ALBUMS_LABELS.prevTab}
                        isDisabled={scrollState.isBeginning}
                        dataTest="top_albums_tab_prev"
                        clickHandler={handlePrev}
                    />
                    <SliderArrow
                        direction="next"
                        ariaLabel={TOP_ALBUMS_LABELS.nextTab}
                        isDisabled={scrollState.isEnd}
                        dataTest="top_albums_tab_next"
                        clickHandler={handleNext}
                    />
                </div>
            )}
        </div>
    );
};

export default TopAlbumsTabs;
