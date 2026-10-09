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

    if (!promoData && lastNews.length === 0) {
        return null;
    }

    return (
        <Section
            className={styles.lastNewsPromoSectionWrapper}
            ariaLabelledBy={hasTitle ? LAST_NEWS_PROMO_COPY.titleId : undefined}
            ariaLabel={hasTitle ? undefined : LAST_NEWS_PROMO_COPY.sliderLabel}
        >
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
