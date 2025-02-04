'use client'

import { FC } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { siteApi } from '@/api/site/site';
import styles from '@/components/menus/TopMenu/TrendsSlider/TrendsSlider.module.scss';

const TrendsSlider: FC = () => {
    const [, { data: baseData }] = siteApi.useGetBaseDataMutation({
        fixedCacheKey: 'baseData',
    });

    return (
        <div className={styles.trendsSliderWrapper}>
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
