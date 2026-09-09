'use client';

import { FC, useState } from 'react';
import { IoPricetagOutline } from 'react-icons/io5';
import { siteApi } from '@/api/site/site';
import { taxonomyApi } from '@/api/taxonomy/taxonomy';
import { shuffle } from '@/helpers/utils';
import Button from '@/components/controls/Button/Button.component';
import PopularTagModal from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.component';
import { POPULAR_TAGS_SLICE_COUNT } from '@/components/widgets/PopularTagsWidget/PopularTagsWidget.config';
import styles from '@/components/widgets/PopularTagsWidget/PopularTagsWidget.module.scss';

const PopularTagsWidget: FC = () => {
    const { data: baseData } = siteApi.useGetCommonDataQuery();
    const [searchPostsByTag, { data: searchPostsByTagData, isLoading }] =
        taxonomyApi.useSearchPostsByTagMutation();

    if (!baseData?.popularTags?.length) {
        return null;
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { data } = searchPostsByTagData || {};

    const openHandler = (): void => {
        setIsModalOpen(true);
        searchPostsByTag(tagData.id);
    };

    const sortedYears = data
        ? Object.keys(data).sort(
              (a, b) => Number.parseInt(b) - Number.parseInt(a),
          )
        : [];

    return (
        <div className={styles.popularTagsWrapper}>
            {shuffle(baseData.popularTags)
                .slice(0, POPULAR_TAGS_SLICE_COUNT)
                .map((tagData) => (
                    <Button
                        key={tagData.slug}
                        clickHandler={openHandler}
                        className={`flc ${styles.tagButtonWrapper} ${className}`}
                        disabled={isLoading}
                        isCustom
                    >
                        {tagData.name}
                    </Button>
                ))}
            <PopularTagModal
                tagData={tagData}
                className={styles.popularTagButton}
            />
        </div>
    );
};

export default PopularTagsWidget;
