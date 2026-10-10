import { FC } from 'react';
import Link from 'next/link';
import { getPostTypeTerm } from '@/configs/postTypeTerms/postTypeTerms.config';
import { formatDate } from '@/helpers/utils';
import styles from '@/components/cards/LatestPostCard/LatestPostCard.module.scss';
import { LatestPostCardPropsIF } from '@/components/cards/LatestPostCard/LatestPostCard.types';
import Button from '@/components/controls/Button/Button.component';
import TermLink from '@/components/elems/TermLink/TermLink.component';

const LatestPostCard: FC<LatestPostCardPropsIF> = ({
    className = '',
    postData,
    postType,
}) => {
    const { coverImg, postDate, taxonomies, titleH1, url } = postData;
    const dateLabel = formatDate(postDate);
    const termSlug = taxonomies?.find((slug) =>
        Boolean(getPostTypeTerm(postType, slug)),
    );

    return (
        <article className={`${styles.card} ${className}`}>
            <Link
                href={url}
                aria-label={titleH1}
                className={`bgc ${styles.cover}`}
                style={
                    coverImg
                        ? { backgroundImage: `url(${coverImg})` }
                        : undefined
                }
            />
            <Link href={url} className={styles.title}>
                {titleH1}
            </Link>
            {dateLabel ? (
                <time className={styles.date} dateTime={postDate}>
                    {dateLabel}
                </time>
            ) : null}
            <div
                className={`${styles.footer} ${termSlug ? styles.footerSpread : ''}`}
            >
                {termSlug ? (
                    <TermLink
                        postType={postType}
                        termSlug={termSlug}
                        size="large"
                    />
                ) : null}
                <Button
                    href={url}
                    isCustom
                    className={styles.action}
                    dataTest="latest_post_card_open"
                    aria-label={`Перейти: ${titleH1}`}
                >
                    Перейти
                </Button>
            </div>
        </article>
    );
};

export default LatestPostCard;
