'use client';

import { FC, useRef, useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Block from '@/components/blocks/Block/Block.component';
import styles from '@/components/widgets/SidebarSlider/SidebarSlider.module.scss';
import { SidebarSliderPropsIF } from '@/components/widgets/SidebarSlider/SidebarSlider.types';

const SidebarSlider: FC<SidebarSliderPropsIF> = ({
    title,
    titleId,
    dotsLabel,
    getSlideLabel,
    slides,
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

    if (slides.length === 0) {
        return null;
    }

    return (
        <Block>
            <h2 id={titleId} className={styles.title}>
                {title}
            </h2>
            <div
                className={styles.slider}
                role="region"
                aria-labelledby={titleId}
            >
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    watchOverflow
                    onSwiper={handleSwiper}
                    onSlideChange={handleSlideChange}
                    className={styles.swiper}
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.key} className={styles.slide}>
                            {slide.content}
                        </SwiperSlide>
                    ))}
                </Swiper>
                {slides.length > 1 ? (
                    <div
                        className={styles.dots}
                        role="group"
                        aria-label={dotsLabel}
                    >
                        {slides.map((slide, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={slide.key}
                                    type="button"
                                    className={`${styles.dot} ${isActive ? styles.active : ''}`}
                                    aria-label={getSlideLabel(
                                        index,
                                        slides.length,
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

export default SidebarSlider;
