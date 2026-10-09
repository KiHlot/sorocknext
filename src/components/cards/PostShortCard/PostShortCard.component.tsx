import { FC } from 'react';
import Link from 'next/link';
import { getPostTypeBySlug } from '@/configs/postTypes.config';
import { formatDate } from '@/helpers/utils';
import styles from '@/components/cards/PostShortCard/PostShortCard.module.scss';
import { PostShortCardPropsIF } from '@/components/cards/PostShortCard/PostShortCard.types';
import Author from '@/components/elems/Author/Author.component';
import TermLink from '@/components/elems/TermLink/TermLink.component';

const PostShortCard: FC<PostShortCardPropsIF> = ({
    postData,
    className = '',
}) => {
    const urlSegment =
        postData.url.split('?')[0]?.split('#')[0]?.split('/').find(Boolean) ??
        '';
    const postType = getPostTypeBySlug(urlSegment);

    return (
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
                        {formatDate(postData.eventDate || postData.postDate)}
                    </span>
                    {postType && !!postData.taxonomies?.length && (
                        <div className={styles.categories}>
                            {postData.taxonomies.map((termSlug) => (
                                <TermLink
                                    key={termSlug}
                                    postType={postType}
                                    termSlug={termSlug}
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
};

export default PostShortCard;
