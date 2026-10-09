import { FC } from 'react';
import Link from 'next/link';
import { IoCalendarOutline, IoTimerOutline } from 'react-icons/io5';
import { formatDate } from '@/helpers/utils';
import styles from '@/components/cards/LastNewsPromoCard/LastNewsPromoCard.module.scss';
import { LastNewsPromoCardPropsIF } from '@/components/cards/LastNewsPromoCard/LastNewsPromoCard.types';
import Author from '@/components/elems/Author/Author.component';
import Country from '@/components/elems/Country/Country.component';

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
    className = '',
}) => {
    const toneClass = COVER_TONE_CLASS[coverTone] ?? styles.tone0;

    return (
        <article className={`${styles.card} ${className}`}>
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
            <div className={`flcol ${styles.body}`}>
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
                        Читать
                    </Link>
                    {!!item.author && (
                        <Author
                            type="name"
                            data={item.author}
                            className={styles.author}
                        />
                    )}
                </div>
            </div>
        </article>
    );
};

export default LastNewsPromoCard;
