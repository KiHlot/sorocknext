'use client';

import { FC, MouseEvent, useState } from 'react';
import Link from 'next/link';
import { IoChatboxEllipsesOutline, IoCopyOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { formatDate, normalizeImage } from '@/helpers/utils';
import {
    ERRORS_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import Button from '@/components/controls/Button/Button.component';
import CategoryLink from '@/components/elems/CategoryLink/CategoryLink.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import styles from '@/components/sections/ArchivePromoSection/ArchivePromoSection.module.scss';
import { ArchivePromoSectionPropsIF } from '@/components/sections/ArchivePromoSection/ArchivePromoSection.types';

const handleCopyLink = async (): Promise<void> => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(SUCCESS_CODES.s107);
    } catch {
        toast.error(ERRORS_CODES.er900);
    }
};

const ArchivePromoSection: FC<ArchivePromoSectionPropsIF> = ({
    pathname,
    title,
    titleId,
    seoData = null,
    archivePromoData = null,
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedPost = archivePromoData?.[selectedIndex] ?? null;
    const excerpt = selectedPost?.content
        .replaceAll(/<[^>]*>/g, ' ')
        .replaceAll(/\s+/g, ' ')
        .trim();
    const watermark = selectedPost?.tags?.[0];

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

    return (
        <section
            className={styles.archivePromoSectionWrapper}
            aria-labelledby={titleId}
        >
            <div className={styles.intro}>
                {seoData ? (
                    <h1
                        id={titleId}
                        className={`archivePromoTitle ${styles.title}`}
                        dangerouslySetInnerHTML={{ __html: seoData.titleH1 }}
                    />
                ) : (
                    <h1 id={titleId} className={styles.title}>
                        {title}
                    </h1>
                )}
                <Breadcrumbs pathname={pathname} />
                {seoData?.description && (
                    <div
                        className={`archivePromoLead ${styles.description}`}
                        dangerouslySetInnerHTML={{
                            __html: seoData.description,
                        }}
                    />
                )}
                <div className={styles.actions}>
                    <Button
                        variant="primary"
                        className={styles.copyButton}
                        clickHandler={handleCopyLink}
                        icon={<IoCopyOutline aria-hidden="true" />}
                        dataTest="archive_promo_copy"
                    >
                        Копировать ссылку
                    </Button>
                    {seoData?.reviewUrl && (
                        <Button
                            href={seoData.reviewUrl}
                            variant="accent"
                            className={styles.reviewButton}
                            icon={
                                <IoChatboxEllipsesOutline aria-hidden="true" />
                            }
                            dataTest="archive_promo_review"
                        >
                            Оставить отзыв
                        </Button>
                    )}
                </div>
            </div>
            {!!archivePromoData?.length && selectedPost && (
                <div className={styles.gallery}>
                    {watermark && (
                        <span className={styles.watermark} aria-hidden="true">
                            {watermark}
                        </span>
                    )}
                    <div
                        className={styles.thumbs}
                        aria-label="Посты промо-блока"
                    >
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
                        <h2 className={styles.featuredTitle}>
                            {selectedPost.titleH1}
                        </h2>
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
                                    <dt className={styles.metaLabel}>
                                        Категория
                                    </dt>
                                    <dd
                                        className={`${styles.metaValue} ${styles.categories}`}
                                    >
                                        {selectedPost.categories.map(
                                            (categorySlug) => (
                                                <CategoryLink
                                                    key={categorySlug}
                                                    categorySLug={categorySlug}
                                                    linkType="text"
                                                />
                                            ),
                                        )}
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
                                            <span
                                                className={`bgc ${styles.authorAvatar}`}
                                                style={{
                                                    backgroundImage: `url(${normalizeImage(selectedPost.author.img80, 'user80')})`,
                                                }}
                                                aria-hidden="true"
                                            />
                                            <span>
                                                {selectedPost.author.fullName}
                                            </span>
                                        </Link>
                                    ) : (
                                        <span className={styles.author}>
                                            <span
                                                className={`bgc ${styles.authorAvatar}`}
                                                style={{
                                                    backgroundImage: `url(${normalizeImage(selectedPost.author.img80, 'user80')})`,
                                                }}
                                                aria-hidden="true"
                                            />
                                            <span>
                                                {selectedPost.author.fullName}
                                            </span>
                                        </span>
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
            )}
        </section>
    );
};

export default ArchivePromoSection;
