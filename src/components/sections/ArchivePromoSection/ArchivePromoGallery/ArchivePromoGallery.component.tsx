'use client';

import { FC, MouseEvent, useState } from 'react';
import Button from '@/components/controls/Button/Button.component';
import ArchivePromoFeatured from '@/components/sections/ArchivePromoSection/ArchivePromoGallery/ArchivePromoFeatured/ArchivePromoFeatured.component';
import styles from '@/components/sections/ArchivePromoSection/ArchivePromoGallery/ArchivePromoGallery.module.scss';
import { ArchivePromoGalleryPropsIF } from '@/components/sections/ArchivePromoSection/ArchivePromoGallery/ArchivePromoGallery.types';

const ArchivePromoGallery: FC<ArchivePromoGalleryPropsIF> = ({
    archivePromoData,
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectedPost = archivePromoData[selectedIndex] ?? archivePromoData[0];

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
            <ArchivePromoFeatured postData={selectedPost} />
        </div>
    );
};

export default ArchivePromoGallery;
