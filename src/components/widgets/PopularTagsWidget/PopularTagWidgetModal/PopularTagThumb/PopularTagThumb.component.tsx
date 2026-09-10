import { FC } from 'react';
import Link from 'next/link';
import CategoryLink from '@/components/elems/CategoryLink/CategoryLink.component';
import styles from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagThumb/PopularTagThumb.module.scss';
import { PopularTagThumbPropsIF } from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagThumb/PopularTagThumb.type';

const PopularTagThumb: FC<PopularTagThumbPropsIF> = ({ thumbData }) => (
    <div className={styles.popularTagThumbWrapper}>
        <Link
            href={thumbData.url}
            aria-label={thumbData.title}
            className={`bgc ${styles.thumb}`}
            style={{
                backgroundImage: `url(${thumbData.thumbnail})`,
            }}
        />

        <div className={styles.content}>
            <Link href={thumbData.url} className={styles.title}>
                {thumbData.title}
            </Link>

            {thumbData.authorUrl && (
                <Link
                    title="Страница автора статьи"
                    href={thumbData.authorUrl}
                    className={styles.post_author}
                >
                    {thumbData.authorName}
                </Link>
            )}

            <div className={styles.date}>{thumbData.publishDate}</div>

            {thumbData.categories && (
                <div className={styles.category_list}>
                    {thumbData.categories.map((slug) => (
                        <CategoryLink
                            key={slug}
                            categorySLug={slug}
                            linkType="small"
                            className={styles.catLink}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
);

export default PopularTagThumb;
