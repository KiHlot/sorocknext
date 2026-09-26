'use client';

import { FC, MouseEvent, useRef } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/sections/RockDatesSection/DaysSlider/DaysSlider.module.scss';
import { DaysSliderPropsIF } from '@/components/sections/RockDatesSection/DaysSlider/DaysSlider.types';
import {
    ROCK_DATES_DAY_BREAKPOINTS,
    ROCK_DATES_LABELS,
} from '@/components/sections/RockDatesSection/RockDatesSection.config';
import SliderArrow from '@/components/sections/RockDatesSection/SliderArrow/SliderArrow.component';

const DaysSlider: FC<DaysSliderPropsIF> = ({
    days,
    activeDayIndex,
    onSelectDay,
}) => {
    const swiperRef = useRef<SwiperInstance | null>(null);

    const handleSwiper = (swiper: SwiperInstance): void => {
        swiperRef.current = swiper;
    };

    const handleSlideChange = (swiper: SwiperInstance): void => {
        if (swiper.realIndex === activeDayIndex) {
            return;
        }

        onSelectDay(swiper.realIndex);
    };

    const handlePrev = (): void => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = (): void => {
        swiperRef.current?.slideNext();
    };

    const handleSelectDay = (event: MouseEvent<HTMLButtonElement>): void => {
        const rawIndex = event.currentTarget.dataset.index;

        if (rawIndex === undefined) {
            return;
        }

        const dayIndex = Number(rawIndex);

        if (!Number.isInteger(dayIndex)) {
            return;
        }

        event.stopPropagation();
        swiperRef.current?.slideToLoop(dayIndex);
    };

    return (
        <div
            className={styles.slider}
            role="group"
            aria-label={ROCK_DATES_LABELS.days}
        >
            <SliderArrow
                direction="prev"
                ariaLabel={ROCK_DATES_LABELS.prevDay}
                dataTest="rock_dates_day_prev"
                clickHandler={handlePrev}
            />
            <Swiper
                initialSlide={activeDayIndex}
                slidesPerView={MAGIC_NUMBERS.RockDatesDaysPerViewSm}
                breakpoints={ROCK_DATES_DAY_BREAKPOINTS}
                centeredSlides
                loop
                slideToClickedSlide
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                className={styles.swiper}
            >
                {days.map((day, index) => {
                    const isActive = index === activeDayIndex;

                    return (
                        <SwiperSlide key={day.dateKey} className={styles.slide}>
                            <Button
                                isCustom
                                className={`${styles.dayButton} ${isActive ? styles.active : ''}`}
                                data-index={index}
                                aria-current={isActive ? 'date' : undefined}
                                clickHandler={handleSelectDay}
                                dataTest={`rock_dates_day_${day.dateKey}`}
                            >
                                <span className={styles.weekday}>
                                    <span className={styles.weekdayFull}>
                                        {day.weekdayLabel}
                                    </span>
                                    <span className={styles.weekdayShort}>
                                        {day.weekdayShortLabel}
                                    </span>
                                </span>
                                <span className={styles.dayLabel}>{day.dayLabel}</span>
                                <span className={styles.monthLabel}>
                                    {day.monthLabel}
                                </span>
                            </Button>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <SliderArrow
                direction="next"
                ariaLabel={ROCK_DATES_LABELS.nextDay}
                dataTest="rock_dates_day_next"
                clickHandler={handleNext}
            />
        </div>
    );
};

export default DaysSlider;
