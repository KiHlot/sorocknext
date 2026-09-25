import { FC } from 'react';
import { formatDate } from '@/helpers/utils';
import Button from '@/components/controls/Button/Button.component';
import CategoryLink from '@/components/elems/CategoryLink/CategoryLink.component';
import styles from '@/components/sections/ArchivePromoSection/ArchivePromoGallery/ArchivePromoFeatured/ArchivePromoFeatured.module.scss';
import { ArchivePromoFeaturedPropsIF } from '@/components/sections/ArchivePromoSection/ArchivePromoGallery/ArchivePromoFeatured/ArchivePromoFeatured.types';

const ArchivePromoFeatured: FC<ArchivePromoFeaturedPropsIF> = ({
    postData,
    className = '',
}) => {
    const {
        author,
        categories,
        content,
        coverImg,
        postDate,
        tags,
        titleH1,
        url,
    } = postData;
    const excerpt = content
        .replaceAll(/<[^>]*>/g, ' ')
        .replaceAll(/\s+/g, ' ')
        .trim();

    return (
        <div className={`${styles.featuredWrap} ${className}`}>
            <div
                className={`bgc ${styles.cover}`}
                role="img"
                aria-label={titleH1}
                style={
                    coverImg
                        ? {
                              backgroundImage: `url(${coverImg})`,
                          }
                        : undefined
                }
            />
            <article className={`flcol ${styles.featured}`}>
                <h2 className={styles.featuredTitle}>{titleH1}</h2>
                <dl className={`flcol ${styles.meta}`}>
                    <div className={styles.metaRow}>
                        <dt className={styles.metaLabel}>Дата</dt>
                        <dd className={styles.metaValue}>
                            <time dateTime={postDate}>
                                {formatDate(postDate)}
                            </time>
                        </dd>
                    </div>
                    {!!tags?.length && (
                        <div className={styles.metaRow}>
                            <dt className={styles.metaLabel}>Теги</dt>
                            <dd className={styles.metaValue}>
                                {tags.join(', ')}
                            </dd>
                        </div>
                    )}
                    {!!categories?.length && (
                        <div className={styles.metaRow}>
                            <dt className={styles.metaLabel}>Категория</dt>
                            <dd
                                className={`${styles.metaValue} ${styles.categories}`}
                            >
                                {categories.map((categorySlug) => (
                                    <CategoryLink
                                        key={categorySlug}
                                        categorySLug={categorySlug}
                                        linkType="text"
                                    />
                                ))}
                            </dd>
                        </div>
                    )}
                    <div className={styles.metaRow}>
                        <dt className={styles.metaLabel}>Автор</dt>
                        <dd className={styles.metaValue}>{author.fullName}</dd>
                    </div>
                </dl>
                {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
                <Button
                    href={url}
                    variant="secondary"
                    className={styles.readButton}
                    dataTest="archive_promo_read"
                >
                    Читать
                </Button>
            </article>
        </div>
    );
};

export default ArchivePromoFeatured;
