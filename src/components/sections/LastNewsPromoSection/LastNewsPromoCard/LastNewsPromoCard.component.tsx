import { FC } from 'react';
import Link from 'next/link';
import { IoCalendarOutline, IoTimerOutline } from 'react-icons/io5';
import { formatDate } from '@/helpers/utils';
import Author from '@/components/elems/Author/Author.component';
import Country from '@/components/elems/Country/Country.component';
import styles from '@/components/sections/LastNewsPromoSection/LastNewsPromoCard/LastNewsPromoCard.module.scss';
import { LastNewsPromoCardPropsIF } from '@/components/sections/LastNewsPromoSection/LastNewsPromoCard/LastNewsPromoCard.types';
import { LAST_NEWS_PROMO_COPY } from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.config';

const COVER_TONE_CLASS = [
    styles.tone0,
    styles.tone1,
    styles.tone2,
    styles.tone3,
    styles.tone4,
] as const;

const LastNewsPromoCard: FC<LastNewsPromoCardPropsIF> = ({
    item,
    coverTone,
    index,
}) => {
    const toneClass = COVER_TONE_CLASS[coverTone] ?? styles.tone0;
    const authorName = item.author?.fullName?.trim();

    return (
        <article className={styles.card}>
            <Link
                href={item.url}
                aria-label={item.title}
                className={`bgc ${styles.cover} ${toneClass}`}
                style={
                    item.innerImg
                        ? { backgroundImage: `url(${item.innerImg})` }
                        : undefined
                }
            >
                <Country value={item.country} className={styles.flag} />
            </Link>
            <div className={styles.body}>
                <Link href={item.url} className={styles.title}>
                    {item.title}
                </Link>
                <div className={styles.meta}>
                    <time className={styles.metaItem} dateTime={item.postDate}>
                        <IoCalendarOutline
                            className={styles.metaIcon}
                            aria-hidden="true"
                        />
                        {formatDate(item.postDate)}
                    </time>
                    <span
                        className={styles.metaItem}
                        title="Время на прочтение"
                    >
                        <IoTimerOutline
                            className={styles.metaIcon}
                            aria-hidden="true"
                        />
                        {item.readingTime} мин.
                    </span>
                </div>
                <div className={styles.footer}>
                    <Link
                        href={item.url}
                        className={styles.read}
                        data-test={`last_news_promo_read_${index}`}
                    >
                        {LAST_NEWS_PROMO_COPY.readLabel}
                    </Link>
                    {authorName && item.author ? (
                        <Author data={item.author} className={styles.author} />
                    ) : null}
                </div>
            </div>
        </article>
    );
};

export default LastNewsPromoCard;
