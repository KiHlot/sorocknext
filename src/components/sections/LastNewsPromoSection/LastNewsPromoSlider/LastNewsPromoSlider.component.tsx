'use client';

import { FC, useRef, useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import LastNewsPromoCard from '@/components/cards/LastNewsPromoCard/LastNewsPromoCard.component';
import {
    LAST_NEWS_PROMO_COPY,
    LAST_NEWS_PROMO_SLIDE_GAP,
    LAST_NEWS_PROMO_SLIDER_BREAKPOINTS,
    getLastNewsPromoSlideLabel,
} from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.config';
import styles from '@/components/sections/LastNewsPromoSection/LastNewsPromoSlider/LastNewsPromoSlider.module.scss';
import { LastNewsPromoSliderPropsIF } from '@/components/sections/LastNewsPromoSection/LastNewsPromoSlider/LastNewsPromoSlider.types';

const LastNewsPromoSlider: FC<LastNewsPromoSliderPropsIF> = ({
    items,
    className = '',
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
        <div
            className={`${styles.slider} ${className}`}
            role="region"
            aria-label={LAST_NEWS_PROMO_COPY.sliderLabel}
        >
            <Swiper
                slidesPerView={1}
                breakpoints={LAST_NEWS_PROMO_SLIDER_BREAKPOINTS}
                spaceBetween={LAST_NEWS_PROMO_SLIDE_GAP}
                watchOverflow
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                className={styles.swiper}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={item.url} className={styles.slide}>
                        <LastNewsPromoCard
                            item={item}
                            coverTone={index}
                            index={index}
                            className={styles.slideCard}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div
                className={styles.dots}
                role="group"
                aria-label={LAST_NEWS_PROMO_COPY.dotsLabel}
            >
                {items.map((item, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <button
                            key={item.url}
                            type="button"
                            className={`${styles.dot} ${isActive ? styles.active : ''}`}
                            aria-label={getLastNewsPromoSlideLabel(
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
        </div>
    );
};

export default LastNewsPromoSlider;
