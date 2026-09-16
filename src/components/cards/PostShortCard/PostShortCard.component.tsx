import { FC } from 'react';
import Link from 'next/link';
import { formatDate } from '@/helpers/utils';
import styles from '@/components/cards/PostShortCard/PostShortCard.module.scss';
import { PostShortCardPropsIF } from '@/components/cards/PostShortCard/PostShortCard.types';
import Author from '@/components/elems/Author/Author.component';
import CategoryLink from '@/components/elems/CategoryLink/CategoryLink.component';

const PostShortCard: FC<PostShortCardPropsIF> = ({
    postData,
    className = '',
}) => (
    <div className={`${styles.postShortCardWrapper} ${className}`}>
        <Link
            href={postData.url}
            aria-label={postData.title}
            className={`bgc ${styles.thumb}`}
            style={{
                backgroundImage: `url(${postData.thumbnail})`,
            }}
        />
        <div
            className={`flcol ${styles.content}  ${postData.author ? styles.pb : ''}`}
        >
            <div className={styles.thumbHeader}>
                <span className={styles.date}>
                    {formatDate(postData.publishDate)}
                </span>
                {postData.categories && (
                    <div className={styles.categories}>
                        {postData.categories.map((slug) => (
                            <CategoryLink
                                key={slug}
                                categorySLug={slug}
                                linkType="small"
                            />
                        ))}
                    </div>
                )}
            </div>
            <Link href={postData.url} className={styles.title}>
                {postData.title}
            </Link>
            {postData.author && (
                <Author
                    data={postData.author}
                    className={styles.author}
                    type="name"
                />
            )}
        </div>
    </div>
);

export default PostShortCard;
