import { FC } from 'react';
import Link from 'next/link';
import { formatDate } from '@/helpers/utils';
import CategoryLink from '@/components/elems/CategoryLink/CategoryLink.component';
import styles from '@/components/elems/PopularTagThumb/PopularTagThumb.module.scss';
import { PopularTagThumbPropsIF } from '@/components/elems/PopularTagThumb/PopularTagThumb.type';

const PopularTagThumb: FC<PopularTagThumbPropsIF> = ({
    thumbData,
    className = '',
}) => (
    <div className={`${styles.popularTagThumbWrapper} ${className}`}>
        <Link
            href={thumbData.url}
            aria-label={thumbData.title}
            className={`bgc ${styles.thumb}`}
            style={{
                backgroundImage: `url(${thumbData.thumbnail})`,
            }}
        />
        <div
            className={`flcol ${styles.content}  ${thumbData.authorUrl ? styles.pb : ''}`}
        >
            <div className={styles.thumbHeader}>
                <span className={styles.date}>
                    {formatDate(thumbData.publishDate)}
                </span>
                {thumbData.categories && (
                    <div className={styles.categories}>
                        {thumbData.categories.map((slug) => (
                            <CategoryLink
                                key={slug}
                                categorySLug={slug}
                                linkType="small"
                            />
                        ))}
                    </div>
                )}
            </div>
            <Link href={thumbData.url} className={styles.title}>
                {thumbData.title}
            </Link>
            {thumbData.authorUrl && (
                <Link
                    title="Страница автора статьи"
                    href={thumbData.authorUrl}
                    className={styles.postAuthor}
                >
                    {thumbData.authorName}
                </Link>
            )}
        </div>
    </div>
);

export default PopularTagThumb;
