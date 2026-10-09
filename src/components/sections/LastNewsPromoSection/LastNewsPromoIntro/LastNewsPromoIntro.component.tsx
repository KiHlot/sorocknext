import { FC } from 'react';
import styles from '@/components/sections/LastNewsPromoSection/LastNewsPromoIntro/LastNewsPromoIntro.module.scss';
import { LastNewsPromoIntroPropsIF } from '@/components/sections/LastNewsPromoSection/LastNewsPromoIntro/LastNewsPromoIntro.types';
import { LAST_NEWS_PROMO_COPY } from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.config';

const LastNewsPromoIntro: FC<LastNewsPromoIntroPropsIF> = ({
    promoData,
    className = '',
}) => (
    <div className={`${styles.intro} ${className}`}>
        {!!promoData.titleH1 && (
            <h1
                id={LAST_NEWS_PROMO_COPY.titleId}
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: promoData.titleH1 }}
            />
        )}
        {!!promoData.description && (
            <div
                className={styles.lead}
                dangerouslySetInnerHTML={{ __html: promoData.description }}
            />
        )}
        {!!promoData.achievementsList?.length && (
            <ul className={styles.stats}>
                {promoData.achievementsList.map((stat) => (
                    <li key={`${stat.value}-${stat.label}`}>
                        <div className={styles.statValue}>{stat.value}</div>
                        <div className={styles.statLabel}>{stat.label}</div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default LastNewsPromoIntro;
