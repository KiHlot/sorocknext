'use client';

import { FC, MouseEvent, useRef } from 'react';
import dayjs from 'dayjs';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/sections/RockDatesSection/MonthsSlider/MonthsSlider.module.scss';
import { MonthsSliderPropsIF } from '@/components/sections/RockDatesSection/MonthsSlider/MonthsSlider.types';
import {
    ROCK_DATES_LABELS,
    ROCK_DATES_MONTH_BREAKPOINTS,
    ROCK_DATES_MONTH_SLIDES_PER_VIEW,
} from '@/components/sections/RockDatesSection/RockDatesSection.config';
import { getYearMonths } from '@/components/sections/RockDatesSection/RockDatesSection.helpers';
import SliderArrow from '@/components/sections/RockDatesSection/SliderArrow/SliderArrow.component';

const MonthsSlider: FC<MonthsSliderPropsIF> = ({
    activeMonthIndex,
    onSelectMonth,
}) => {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const months = getYearMonths(dayjs().year());

    const handleSwiper = (swiper: SwiperInstance): void => {
        swiperRef.current = swiper;
    };

    const handleSlideChange = (swiper: SwiperInstance): void => {
        if (swiper.realIndex === activeMonthIndex) {
            return;
        }

        onSelectMonth(swiper.realIndex);
    };

    const handlePrev = (): void => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = (): void => {
        swiperRef.current?.slideNext();
    };

    const handleSelectMonth = (event: MouseEvent<HTMLButtonElement>): void => {
        const rawIndex = event.currentTarget.dataset.index;

        if (rawIndex === undefined) {
            return;
        }

        const monthIndex = Number(rawIndex);

        if (!Number.isInteger(monthIndex)) {
            return;
        }

        event.stopPropagation();
        swiperRef.current?.slideToLoop(monthIndex);
    };

    return (
        <div
            className={styles.slider}
            role="group"
            aria-label={ROCK_DATES_LABELS.months}
        >
            <SliderArrow
                direction="prev"
                ariaLabel={ROCK_DATES_LABELS.prevMonth}
                dataTest="rock_dates_month_prev"
                clickHandler={handlePrev}
            />
            <Swiper
                initialSlide={activeMonthIndex}
                slidesPerView={ROCK_DATES_MONTH_SLIDES_PER_VIEW}
                breakpoints={ROCK_DATES_MONTH_BREAKPOINTS}
                centeredSlides
                loop
                slideToClickedSlide
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                className={styles.swiper}
            >
                {months.map((month) => {
                    const isActive = month.index === activeMonthIndex;

                    return (
                        <SwiperSlide key={month.id} className={styles.slide}>
                            <Button
                                isCustom
                                className={`${styles.monthButton} ${isActive ? styles.active : ''}`}
                                data-index={month.index}
                                aria-current={isActive ? 'true' : undefined}
                                clickHandler={handleSelectMonth}
                                dataTest={`rock_dates_month_${month.id}`}
                            >
                                {month.label}
                            </Button>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <SliderArrow
                direction="next"
                ariaLabel={ROCK_DATES_LABELS.nextMonth}
                dataTest="rock_dates_month_next"
                clickHandler={handleNext}
            />
        </div>
    );
};

export default MonthsSlider;
