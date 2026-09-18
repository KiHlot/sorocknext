'use client';

import { FC, MouseEvent, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/helpers/utils';
import Button from '@/components/controls/Button/Button.component';
import CategoryLink from '@/components/elems/CategoryLink/CategoryLink.component';
import styles from '@/components/sections/ArchivePromoSection/ArchivePromoGallery/ArchivePromoGallery.module.scss';
import { ArchivePromoGalleryPropsIF } from '@/components/sections/ArchivePromoSection/ArchivePromoGallery/ArchivePromoGallery.types';

const ArchivePromoGallery: FC<ArchivePromoGalleryPropsIF> = ({
    archivePromoData,
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectedPost = archivePromoData[selectedIndex] ?? archivePromoData[0];
    const excerpt = selectedPost?.content
        .replaceAll(/<[^>]*>/g, ' ')
        .replaceAll(/\s+/g, ' ')
        .trim();

    const handleSelectPost = (event: MouseEvent<HTMLButtonElement>): void => {
        const rawIndex = event.currentTarget.dataset.index;

        if (rawIndex === undefined) {
            return;
        }

        const nextIndex = Number(rawIndex);

        if (Number.isInteger(nextIndex)) {
            setSelectedIndex(nextIndex);
        }
    };

    if (!selectedPost) {
        return null;
    }

    return (
        <div className={styles.gallery}>
            <div className={styles.thumbs} aria-label="Посты промо-блока">
                {archivePromoData.map((postData, index) => {
                    const isSelected = index === selectedIndex;

                    return (
                        <Button
                            key={postData.url}
                            isCustom
                            className={`bgc ${styles.thumb} ${isSelected ? styles.thumbSelected : ''}`}
                            clickHandler={handleSelectPost}
                            data-index={index}
                            aria-pressed={isSelected}
                            aria-label={postData.titleH1}
                            dataTest={`archive_promo_thumb_${index}`}
                            style={
                                postData.coverImg
                                    ? {
                                          backgroundImage: `url(${postData.coverImg})`,
                                      }
                                    : undefined
                            }
                        />
                    );
                })}
            </div>
            <div
                className={`bgc ${styles.cover}`}
                role="img"
                aria-label={selectedPost.titleH1}
                style={
                    selectedPost.coverImg
                        ? {
                              backgroundImage: `url(${selectedPost.coverImg})`,
                          }
                        : undefined
                }
            />
            <article className={styles.featured}>
                <h2 className={styles.featuredTitle}>{selectedPost.titleH1}</h2>
                <dl className={styles.meta}>
                    <div className={styles.metaRow}>
                        <dt className={styles.metaLabel}>Дата</dt>
                        <dd className={styles.metaValue}>
                            <time dateTime={selectedPost.postDate}>
                                {formatDate(selectedPost.postDate)}
                            </time>
                        </dd>
                    </div>
                    {!!selectedPost.tags?.length && (
                        <div className={styles.metaRow}>
                            <dt className={styles.metaLabel}>Теги</dt>
                            <dd className={styles.metaValue}>
                                {selectedPost.tags.join(', ')}
                            </dd>
                        </div>
                    )}
                    {!!selectedPost.categories?.length && (
                        <div className={styles.metaRow}>
                            <dt className={styles.metaLabel}>Категория</dt>
                            <dd
                                className={`${styles.metaValue} ${styles.categories}`}
                            >
                                {selectedPost.categories.map((categorySlug) => (
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
                        <dd className={styles.metaValue}>
                            {selectedPost.author.url ? (
                                <Link
                                    href={selectedPost.author.url}
                                    className={styles.author}
                                >
                                    {selectedPost.author.fullName}
                                </Link>
                            ) : (
                                selectedPost.author.fullName
                            )}
                        </dd>
                    </div>
                </dl>
                {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
                <div className={styles.readWrap}>
                    <Button
                        href={selectedPost.url}
                        variant="secondary"
                        className={styles.readButton}
                        dataTest="archive_promo_read"
                    >
                        Читать
                    </Button>
                </div>
            </article>
        </div>
    );
};

export default ArchivePromoGallery;
