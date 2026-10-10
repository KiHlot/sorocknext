import { FC } from 'react';
import { ABOUT_PARTNERS_COPY } from '@/components/sections/AboutPartnersSection/AboutPartnersSection.config';
import styles from '@/components/sections/AboutPartnersSection/AboutPartnersSection.module.scss';
import { AboutPartnersSectionPropsIF } from '@/components/sections/AboutPartnersSection/AboutPartnersSection.types';

const AboutPartnersSection: FC<AboutPartnersSectionPropsIF> = ({ data }) => (
    <section
        className={styles.section}
        aria-labelledby={ABOUT_PARTNERS_COPY.titleId}
    >
        <div className={styles.brush} aria-hidden="true" />
        <div className={styles.brushSecond} aria-hidden="true" />
        <div className={styles.body}>
            <h2 id={ABOUT_PARTNERS_COPY.titleId} className={styles.title}>
                {ABOUT_PARTNERS_COPY.title}
            </h2>
            <div className={styles.layout}>
                <p className={styles.lead}>{data.lead}</p>
                <ul className={styles.list}>
                    {data.items.map((partner) => (
                        <li key={partner.url} className={styles.item}>
                            <a
                                href={partner.url}
                                className={styles.logo}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                title={partner.title}
                            >
                                {partner.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);

export default AboutPartnersSection;
