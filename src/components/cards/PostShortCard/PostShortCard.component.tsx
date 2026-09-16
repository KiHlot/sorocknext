import { FC } from 'react';
import Link from 'next/link';
import { formatDate } from '@/helpers/utils';
import styles from '@/components/cards/PostShortCard/PostShortCard.module.scss';
import { PostShortCardPropsIF } from '@/components/cards/PostShortCard/PostShortCard.types';
import Author from '@/components/elems/Author/Author.component';
import CategoryLink from '@/components/elems/CategoryLink/CategoryLink.component';

const PostShortCard: FC<PostShortCardPropsIF> = ({
    thumbData,
    className = '',
}) => (
    <div className={`${styles.postShortCardWrapper} ${className}`}>
        <Link
            href={thumbData.url}
            aria-label={thumbData.title}
            className={`bgc ${styles.thumb}`}
            style={{
                backgroundImage: `url(${thumbData.thumbnail})`,
            }}
        />
        <div
            className={`flcol ${styles.content}  ${thumbData.author ? styles.pb : ''}`}
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
            {thumbData.author && (
                <Author
                    data={thumbData.author}
                    className={styles.author}
                    type="name"
                />
            )}
        </div>
    </div>
);

export default PostShortCard;
