'use client';

import { FC } from 'react';
import ozzyImage from '@/images/about/ozzy.png';
import { siteApi } from '@/api/site/site';
import SectionWatermark from '@/components/elems/SectionWatermark/SectionWatermark.component';
import { WHO_WE_ARE_COPY } from '@/components/sections/WhoWeAreSection/WhoWeAreSection.config';
import { WHO_WE_ARE_ITEMS } from '@/components/sections/WhoWeAreSection/WhoWeAreSection.mock';
import styles from '@/components/sections/WhoWeAreSection/WhoWeAreSection.module.scss';
import { WhoWeAreSectionPropsIF } from '@/components/sections/WhoWeAreSection/WhoWeAreSection.types';

const WhoWeAreSection: FC<WhoWeAreSectionPropsIF> = ({ className = '' }) => {
    const { data } = siteApi.useGetCommonDataQuery();
    const items = data?.whoWeAre?.length ? data.whoWeAre : WHO_WE_ARE_ITEMS;

    return (
        <section
            className={`${styles.section} ${className}`}
            aria-label={WHO_WE_ARE_COPY.label}
            itemScope
            itemType="https://schema.org/FAQPage"
        >
            <SectionWatermark
                className={styles.watermark}
                text={WHO_WE_ARE_COPY.watermark}
            />
            <img
                className={styles.portrait}
                src={ozzyImage.src}
                alt=""
                aria-hidden
            />
            <div className={styles.card}>
                {items.map((item) => (
                    <div
                        key={item.title}
                        className={styles.item}
                        itemScope
                        itemProp="mainEntity"
                        itemType="https://schema.org/Question"
                    >
                        <h2 className={styles.itemTitle} itemProp="name">
                            {item.title}
                        </h2>
                        <p
                            className={styles.itemText}
                            itemScope
                            itemProp="acceptedAnswer"
                            itemType="https://schema.org/Answer"
                        >
                            <span itemProp="text">{item.text}</span>
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhoWeAreSection;
