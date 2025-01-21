'use client';

import { FC } from 'react';
import styles from '@/components/menus/TopMenu/TrendsSlider/TrendsSlider.module.scss';
import { TrendsSliderPropsIF } from '@/components/menus/TopMenu/TrendsSlider/TrendsSlider.types';

const TrendsSlider: FC<TrendsSliderPropsIF> = ({ className = '' }) => {
    const temp = 'remove_this';

    return (
        <div className={`${styles.trendsSliderWrapper} ${className}`}>
            TrendsSlider
        </div>
    );
};

export default TrendsSlider;
