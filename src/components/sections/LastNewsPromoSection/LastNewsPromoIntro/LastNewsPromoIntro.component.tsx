import { FC } from 'react';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/sections/LastNewsPromoSection/LastNewsPromoIntro/LastNewsPromoIntro.module.scss';
import { LastNewsPromoIntroPropsIF } from '@/components/sections/LastNewsPromoSection/LastNewsPromoIntro/LastNewsPromoIntro.types';
import { LAST_NEWS_PROMO_COPY } from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.config';

const LastNewsPromoIntro: FC<LastNewsPromoIntroPropsIF> = ({
    className = '',
}) => (
    <div className={`${styles.intro} ${className}`}>
        <h1 id={LAST_NEWS_PROMO_COPY.titleId} className={styles.title}>
            {LAST_NEWS_PROMO_COPY.titleLead}{' '}
            <span className={styles.titleAccent}>
                {LAST_NEWS_PROMO_COPY.titleAccent}
            </span>{' '}
            {LAST_NEWS_PROMO_COPY.titleTail}
        </h1>
        <p className={styles.lead}>{LAST_NEWS_PROMO_COPY.lead}</p>
        <Button
            href={LAST_NEWS_PROMO_COPY.ctaHref}
            variant="accent"
            className={styles.explore}
            dataTest="last_news_promo_explore"
        >
            {LAST_NEWS_PROMO_COPY.ctaLabel}
        </Button>
        <ul className={styles.stats}>
            {LAST_NEWS_PROMO_COPY.stats.map((stat) => (
                <li key={stat.id}>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                </li>
            ))}
        </ul>
    </div>
);

export default LastNewsPromoIntro;
