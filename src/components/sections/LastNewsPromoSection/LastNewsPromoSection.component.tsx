import { FC } from 'react';
import Section from '@/components/blocks/Section/Section.component';
import LastNewsPromoIntro from '@/components/sections/LastNewsPromoSection/LastNewsPromoIntro/LastNewsPromoIntro.component';
import { LAST_NEWS_PROMO_COPY } from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.config';
import styles from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.module.scss';
import { LastNewsPromoSectionPropsIF } from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.types';
import LastNewsPromoSlider from '@/components/sections/LastNewsPromoSection/LastNewsPromoSlider/LastNewsPromoSlider.component';

const LastNewsPromoSection: FC<LastNewsPromoSectionPropsIF> = ({
    lastNewsPromoData,
}) => {
    const promoData = lastNewsPromoData?.promoData ?? null;
    const lastNews = lastNewsPromoData?.lastNews ?? [];
    const hasTitle = Boolean(promoData?.titleH1);

    if (!promoData && !lastNews.length) {
        return null;
    }

    return (
        <Section
            className={styles.lastNewsPromoSectionWrapper}
            ariaLabelledBy={
                hasTitle ? LAST_NEWS_PROMO_COPY.titleId : undefined
            }
            ariaLabel={hasTitle ? undefined : LAST_NEWS_PROMO_COPY.sliderLabel}
        >
            <svg
                className={styles.decor}
                viewBox="0 0 1200 480"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
                focusable="false"
            >
                <g fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M-40 90c180-80 260 40 420-20s280-90 520 10" />
                    <path d="M-20 300c200-70 300 90 520 10s240-80 460 40" />
                    <path d="M80-20c40 120 160 160 180 280" />
                </g>
            </svg>
            {promoData ? (
                <LastNewsPromoIntro
                    promoData={promoData}
                    className={styles.intro}
                />
            ) : null}
            {lastNews.length > 0 ? (
                <LastNewsPromoSlider
                    items={lastNews}
                    className={styles.sliderColumn}
                />
            ) : null}
        </Section>
    );
};

export default LastNewsPromoSection;
