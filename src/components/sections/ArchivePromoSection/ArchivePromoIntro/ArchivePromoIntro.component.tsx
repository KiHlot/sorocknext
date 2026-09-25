'use client';

import { FC } from 'react';
import { IoChatboxEllipsesOutline, IoCopyOutline } from 'react-icons/io5';
import { handleCopyLink } from '@/helpers/utils';
import Button from '@/components/controls/Button/Button.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import styles from '@/components/sections/ArchivePromoSection/ArchivePromoIntro/ArchivePromoIntro.module.scss';
import { ArchivePromoIntroPropsIF } from '@/components/sections/ArchivePromoSection/ArchivePromoIntro/ArchivePromoIntro.types';

const ArchivePromoIntro: FC<ArchivePromoIntroPropsIF> = ({
    pathname,
    title,
    titleId,
    seoData = null,
}) => (
    <div className={styles.intro}>
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
            <Button
                isCustom
                className={`flc ${styles.iconButton} ${styles.copyButton}`}
                clickHandler={handleCopyLink}
                aria-label="Копировать ссылку"
                dataTest="archive_promo_copy"
            >
                <IoCopyOutline aria-hidden="true" />
            </Button>
            {seoData?.reviewUrl && (
                <Button
                    isCustom
                    href={seoData.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flc ${styles.iconButton} ${styles.reviewButton}`}
                    aria-label="Оставить отзыв"
                    dataTest="archive_promo_review"
                >
                    <IoChatboxEllipsesOutline aria-hidden="true" />
                </Button>
            )}
        </div>
    </div>
);

export default ArchivePromoIntro;
