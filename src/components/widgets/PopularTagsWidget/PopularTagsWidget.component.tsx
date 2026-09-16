'use client';

import { FC, MouseEvent, useRef, useState } from 'react';
import { TagIF } from '@/types/common';
import { siteApi } from '@/api/site/site';
import { taxonomyApi } from '@/api/taxonomy/taxonomy';
import { shuffle } from '@/helpers/utils';
import Button from '@/components/controls/Button/Button.component';
import PopularTagModal from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.component';
import { MODAL_ID } from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.config';
import { POPULAR_TAGS_SLICE_COUNT } from '@/components/widgets/PopularTagsWidget/PopularTagsWidget.config';
import styles from '@/components/widgets/PopularTagsWidget/PopularTagsWidget.module.scss';

const PopularTagsWidget: FC = () => {
    const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

    const { data: baseData } = siteApi.useGetCommonDataQuery();
    const [
        searchPostsByTag,
        { data: searchPostsByTagData, isFetching, isError },
    ] = taxonomyApi.useLazySearchPostsByTagQuery();

    const [selectedTag, setSelectedTag] = useState<TagIF | null>(null);
    const [tagsCache, setTagsCache] = useState<{
        idsKey: string;
        value: TagIF[];
    } | null>(null);

    const { data } = searchPostsByTagData || {};
    const popularTags = baseData?.popularTags;
    const idsKey = popularTags?.length
        ? popularTags.map((tag) => tag.id).join(',')
        : '';

    if (!idsKey && tagsCache !== null) {
        setTagsCache(null);
    } else if (idsKey && popularTags && tagsCache?.idsKey !== idsKey) {
        setTagsCache({
            idsKey,
            value: shuffle(popularTags).slice(0, POPULAR_TAGS_SLICE_COUNT),
        });
    }

    const tags =
        idsKey && tagsCache?.idsKey === idsKey ? tagsCache?.value : null;

    const openHandler = (
        tagData: TagIF,
        event: MouseEvent<HTMLButtonElement>,
    ): void => {
        lastTriggerRef.current = event.currentTarget;
        setSelectedTag(tagData);
        searchPostsByTag(tagData.id);
    };

    const closeHandler = (): void => {
        setSelectedTag(null);
        queueMicrotask(() => {
            lastTriggerRef.current?.focus();
        });
    };

    if (!tags) {
        return null;
    }

    return (
        <>
            <div className={styles.popularTagsWrapper}>
                {tags.map((tagData) => {
                    const isSelected = selectedTag?.id === tagData.id;

                    return (
                        <Button
                            key={tagData.slug}
                            clickHandler={(event) =>
                                openHandler(tagData, event)
                            }
                            className={`flc ${styles.tagButton}`}
                            disabled={isFetching || !!selectedTag}
                            isCustom
                            dataTest="open_popular_tag_modal"
                            aria-haspopup="dialog"
                            aria-expanded={isSelected}
                            aria-controls={isSelected ? MODAL_ID : undefined}
                            aria-label={`Посты по тегу: ${tagData.name}`}
                        >
                            {tagData.name}
                        </Button>
                    );
                })}
            </div>
            {selectedTag && (
                <PopularTagModal
                    data={data}
                    isLoading={isFetching}
                    isError={isError}
                    modalLabel={`Посты по тегу: ${selectedTag.name}`}
                    onClose={closeHandler}
                />
            )}
        </>
    );
};

export default PopularTagsWidget;
