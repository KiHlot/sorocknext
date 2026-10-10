import { FC } from 'react';
import SectionWatermark from '@/components/elems/SectionWatermark/SectionWatermark.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import AboutBusinessCard from '@/components/sections/AboutPromoSection/AboutBusinessCard/AboutBusinessCard.component';
import AboutPromoActions from '@/components/sections/AboutPromoSection/AboutPromoActions/AboutPromoActions.component';
import { ABOUT_PROMO_COPY } from '@/components/sections/AboutPromoSection/AboutPromoSection.config';
import styles from '@/components/sections/AboutPromoSection/AboutPromoSection.module.scss';
import { AboutPromoSectionPropsIF } from '@/components/sections/AboutPromoSection/AboutPromoSection.types';

const AboutPromoSection: FC<AboutPromoSectionPropsIF> = ({ data }) => (
    <section
        className={styles.section}
        aria-labelledby={ABOUT_PROMO_COPY.titleId}
    >
        <SectionWatermark
            className={styles.watermark}
            text={ABOUT_PROMO_COPY.watermark}
        />
        <div className={styles.layout}>
            <div className={`flcol gapBlock ${styles.intro}`}>
                <h1 id={ABOUT_PROMO_COPY.titleId} className={styles.title}>
                    {data.title}
                </h1>
                <Breadcrumbs pathname="/about" title="О нас" />
                <div
                    className={styles.lead}
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />
                <AboutPromoActions reviewUrl={data.reviewUrl} />
                <ul className={styles.stats}>
                    {data.stats.map((stat) => (
                        <li
                            key={`${stat.value}-${stat.label}`}
                            className={styles.stat}
                        >
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <AboutBusinessCard
                className={styles.business}
                data={data.business}
            />
        </div>
    </section>
);

export default AboutPromoSection;
