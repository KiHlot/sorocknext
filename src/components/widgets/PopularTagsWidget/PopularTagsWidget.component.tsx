'use client';

import { FC, useState } from 'react';
import { TagIF } from '@/types/common';
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

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedTag, setSelectedTag] = useState<TagIF | null>(null);

    const { data } = searchPostsByTagData || {};

    const openHandler = (tagData: TagIF): void => {
        setSelectedTag(tagData);
        setIsModalOpen(true);
        searchPostsByTag(tagData.id);
    };

    const closeHandler = (): void => {
        setIsModalOpen(false);
        setSelectedTag(null);
    };

    if (!baseData?.popularTags?.length) {
        return null;
    }

    return (
        <>
            <div className={styles.popularTagsWrapper}>
                {shuffle(baseData.popularTags)
                    .slice(0, POPULAR_TAGS_SLICE_COUNT)
                    .map((tagData) => (
                        <Button
                            key={tagData.slug}
                            clickHandler={() => openHandler(tagData)}
                            className={`flc ${styles.tagButtonWrapper}`}
                            disabled={isLoading}
                            isCustom
                            dataTest="open_popular_tag_modal_button"
                        >
                            {tagData.name}
                        </Button>
                    ))}
            </div>
            {isModalOpen && data && selectedTag && (
                <PopularTagModal
                    data={data}
                    modalLabel={`Посты по тегу: ${selectedTag.name}`}
                    onClose={closeHandler}
                />
            )}
        </>
    );
};

export default PopularTagsWidget;
