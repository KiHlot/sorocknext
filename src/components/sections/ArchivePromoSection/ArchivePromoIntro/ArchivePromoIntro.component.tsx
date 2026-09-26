'use client';

import { FC } from 'react';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import CopyLinkButton from '@/components/interactive/CopyLinkButton/CopyLinkButton.component';
import ReviewButton from '@/components/interactive/ReviewButton/ReviewButton.component';
import styles from '@/components/sections/ArchivePromoSection/ArchivePromoIntro/ArchivePromoIntro.module.scss';
import { ArchivePromoIntroPropsIF } from '@/components/sections/ArchivePromoSection/ArchivePromoIntro/ArchivePromoIntro.types';

const ArchivePromoIntro: FC<ArchivePromoIntroPropsIF> = ({
    pathname,
    title,
    titleId,
    seoData = null,
    className = '',
}) => (
    <div className={`flcol ${styles.archivePromoIntroWrapper} ${className}`}>
        {seoData ? (
            <h1
                id={titleId}
                className={`${styles.archivePromoTitle} ${styles.title}`}
                dangerouslySetInnerHTML={{ __html: seoData.titleH1 }}
            />
        ) : (
            <h1 id={titleId} className={styles.title}>
                {title}
            </h1>
        )}
        <Breadcrumbs pathname={pathname} className={styles.breadcrumbs} />
        {seoData?.description && (
            <div
                className={`${styles.archivePromoLead} ${styles.description}`}
                dangerouslySetInnerHTML={{
                    __html: seoData.description,
                }}
            />
        )}
        <div className={styles.actions}>
            <CopyLinkButton dataTest="archive_promo_copy" size="large" />
            {seoData?.reviewUrl && (
                <ReviewButton
                    href={seoData.reviewUrl}
                    dataTest="archive_promo_review"
                    size="large"
                />
            )}
        </div>
    </div>
);

export default ArchivePromoIntro;
