import { FC, ReactElement } from 'react';
import { IoBulbOutline, IoCalendarOutline } from 'react-icons/io5';
import {
    ABOUT_HISTORY_COPY,
    ABOUT_TIMELINE_VARIANT,
    AboutTimelineVariantT,
} from '@/components/sections/AboutHistorySection/AboutHistorySection.config';
import styles from '@/components/sections/AboutHistorySection/AboutHistorySection.module.scss';
import { AboutHistorySectionPropsIF } from '@/components/sections/AboutHistorySection/AboutHistorySection.types';
import { AboutTimelineItemIF } from '@/templates/AboutTPL/AboutTPL.types';

const renderTimeline = (
    items: AboutTimelineItemIF[],
    variant: AboutTimelineVariantT,
): ReactElement => {
    const MarkerIcon =
        variant === ABOUT_TIMELINE_VARIANT.History
            ? IoBulbOutline
            : IoCalendarOutline;

    return (
        <ul className={`${styles.list} ${styles[variant]}`}>
            {items.map((item) => (
                <li key={`${item.label}-${item.title}`} className={styles.item}>
                    <MarkerIcon className={styles.marker} aria-hidden />
                    <div
                        className={styles.label}
                        dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                    <h3
                        className={styles.itemTitle}
                        dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <div
                        className={styles.text}
                        dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                </li>
            ))}
        </ul>
    );
};

const AboutHistorySection: FC<AboutHistorySectionPropsIF> = ({
    history,
    facts,
}) => (
    <section aria-labelledby={ABOUT_HISTORY_COPY.titleId}>
        <div className={styles.body}>
            <h2 id={ABOUT_HISTORY_COPY.titleId} className={styles.title}>
                {ABOUT_HISTORY_COPY.title}
            </h2>
            <div className={styles.columns}>
                {renderTimeline(history, ABOUT_TIMELINE_VARIANT.History)}
                {renderTimeline(facts, ABOUT_TIMELINE_VARIANT.Facts)}
            </div>
        </div>
    </section>
);

export default AboutHistorySection;
