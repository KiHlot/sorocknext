'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { siteApi } from '@/api/site/site';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import styles from '@/components/sections/Header/TrendsSlider/TrendsSlider.module.scss';
import { TrendsSliderPropsIF } from '@/components/sections/Header/TrendsSlider/TrendsSlider.types';

const TrendsSlider: FC<TrendsSliderPropsIF> = ({ className }) => {
    const { data: baseData } = siteApi.useGetCommonDataQuery();
    const trends = baseData?.trends ?? [];

    return (
        <div className={`${styles.trendsSliderWrapper} ${className}`}>
            <div className={`flc ${styles.swiperTitle}`}>Тренд:</div>
            {trends.length >= MAGIC_NUMBERS.SwiperLoopMinSlides ? (
                <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2500,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                    }}
                    loop
                    className={styles.swiperBlock}
                >
                    {trends.map(({ label, url }) => (
                        <SwiperSlide className={styles.slide} key={url}>
                            <Link href={url}>{label}</Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className={styles.swiperBlock}>
                    {trends[0] ? (
                        <div className={styles.slide}>
                            <Link href={trends[0].url}>{trends[0].label}</Link>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default TrendsSlider;
