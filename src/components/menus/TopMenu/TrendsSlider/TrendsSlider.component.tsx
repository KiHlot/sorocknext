'use client';

import { FC } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { siteApi } from '@/api/site/site';
import styles from '@/components/menus/TopMenu/TrendsSlider/TrendsSlider.module.scss';
import { TrendsSliderPropsIF } from '@/components/menus/TopMenu/TrendsSlider/TrendsSlider.types';

const TrendsSlider: FC<TrendsSliderPropsIF> = ({ className }) => {
    const { data: baseData } = siteApi.useGetCommonDataQuery();

    return (
        <div className={`${styles.trendsSliderWrapper} ${className}`}>
            <div className={`flc ${styles.swiperTitle}`}>Тренд:</div>
            <Swiper
                direction="vertical"
                slidesPerView={1}
                modules={[Autoplay]}
                autoplay={{
                    delay: 2500,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
                loop={true}
                className={styles.swiperBlock}
            >
                {baseData?.trends?.map(({ label, url }) => (
                    <SwiperSlide className={styles.slide} key={url}>
                        <Link href={url}>{label}</Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TrendsSlider;
