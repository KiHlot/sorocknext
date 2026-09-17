import { FC } from 'react';
import Link from 'next/link';
import { IoCalendarOutline, IoTimerOutline } from 'react-icons/io5';
import { formatDate, normalizeImage } from '@/helpers/utils';
import styles from '@/components/cards/PostArchiveCard/PostArchiveCard.module.scss';
import { PostArchiveCardPropsIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';
import Button from '@/components/controls/Button/Button.component';
import CategoryLink from '@/components/elems/CategoryLink/CategoryLink.component';
import Country from '@/components/elems/Country/Country.component';

const PostArchiveCard: FC<PostArchiveCardPropsIF> = ({
    className = '',
    postData,
}) => {
    const {
        author,
        categories,
        content,
        country,
        coverImg,
        postDate,
        readingTime,
        tags,
        titleH1,
        url,
    } = postData;
    const excerpt = content
        .replaceAll(/<[^>]*>/g, ' ')
        .replaceAll(/\s+/g, ' ')
        .trim();

    return (
        <article className={`${styles.postArchiveCardWrapper} ${className}`}>
            <div className={styles.coverWrapper}>
                <Link
                    href={url}
                    className={`bgc ${styles.cover}`}
                    style={{
                        backgroundImage: coverImg
                            ? `linear-gradient(to top, rgba(33, 40, 47, 0.45), transparent 55%), url(${coverImg})`
                            : undefined,
                    }}
                    aria-label={titleH1}
                />
                {!!categories?.length && (
                    <span className={styles.categories}>
                        {categories.map((categorySlug) => (
                            <CategoryLink
                                key={categorySlug}
                                categorySLug={categorySlug}
                                linkType="small"
                            />
                        ))}
                    </span>
                )}
                <Country value={country} className={styles.country} />
            </div>

            <div className={styles.content}>
                <div className={styles.meta}>
                    <time className={styles.metaItem} dateTime={postDate}>
                        <IoCalendarOutline
                            className={styles.metaIcon}
                            aria-hidden="true"
                        />
                        {formatDate(postDate)}
                    </time>
                    <span
                        className={styles.metaItem}
                        title="Время на прочтение"
                    >
                        <IoTimerOutline
                            className={styles.metaIcon}
                            aria-hidden="true"
                        />
                        {readingTime} мин.
                    </span>
                </div>

                <h2 className={styles.title}>
                    <Link href={url} className={styles.titleLink}>
                        {titleH1}
                    </Link>
                </h2>

                {excerpt && <p className={styles.excerpt}>{excerpt}</p>}

                {!!tags?.length && (
                    <ul className={styles.tags} aria-label="Теги публикации">
                        {tags.map((tag) => (
                            <li key={tag} className={styles.tag}>
                                #{tag}
                            </li>
                        ))}
                    </ul>
                )}

                <footer className={styles.footer}>
                    {author.url ? (
                        <Link href={author.url} className={styles.author}>
                            <span
                                className={`bgc ${styles.authorAvatar}`}
                                style={{
                                    backgroundImage: `url(${normalizeImage(author.img80, 'user80')})`,
                                }}
                                aria-hidden="true"
                            />
                            <span className={styles.authorName}>
                                {author.fullName}
                            </span>
                        </Link>
                    ) : (
                        <span className={styles.author}>
                            <span
                                className={`bgc ${styles.authorAvatar}`}
                                style={{
                                    backgroundImage: `url(${normalizeImage(author.img80, 'user80')})`,
                                }}
                                aria-hidden="true"
                            />
                            <span className={styles.authorName}>
                                {author.fullName}
                            </span>
                        </span>
                    )}
                    <Button
                        href={url}
                        variant="link"
                        className={styles.readMore}
                        dataTest="post_archive_card_read"
                    >
                        Читать
                    </Button>
                </footer>
            </div>
        </article>
    );
};

export default PostArchiveCard;
