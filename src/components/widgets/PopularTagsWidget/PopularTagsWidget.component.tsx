'use client';

import { FC, useMemo, useState } from 'react';
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
    const [searchPostsByTag, { data: searchPostsByTagData, isFetching }] =
        taxonomyApi.useLazySearchPostsByTagQuery();

    const [selectedTag, setSelectedTag] = useState<TagIF | null>(null);

    const { data } = searchPostsByTagData || {};

    const tags = useMemo(
        () =>
            baseData?.popularTags?.length
                ? shuffle(baseData?.popularTags).slice(
                      0,
                      POPULAR_TAGS_SLICE_COUNT,
                  )
                : null,
        [baseData?.popularTags],
    );

    const openHandler = (tagData: TagIF): void => {
        setSelectedTag(tagData);
        searchPostsByTag(tagData.id);
    };

    const closeHandler = (): void => {
        setSelectedTag(null);
    };

    if (!tags) {
        return null;
    }

    return (
        <>
            <div className={styles.popularTagsWrapper}>
                {tags.map((tagData) => (
                    <Button
                        key={tagData.slug}
                        clickHandler={() => openHandler(tagData)}
                        className={`flc ${styles.tagButton}`}
                        disabled={isFetching || !!selectedTag}
                        isCustom
                        dataTest="open_popular_tag_modal_button"
                    >
                        {tagData.name}
                    </Button>
                ))}
            </div>
            {selectedTag && (
                <PopularTagModal
                    data={data}
                    isLoading={isFetching}
                    modalLabel={`Посты по тегу: ${selectedTag.name}`}
                    onClose={closeHandler}
                />
            )}
        </>
    );
};

export default PopularTagsWidget;
