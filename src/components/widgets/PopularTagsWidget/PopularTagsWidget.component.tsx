'use client';

import { FC } from 'react';
import { siteApi } from '@/api/site/site';
import { shuffle } from '@/helpers/utils';
import PopularTagModal from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.component';
import { POPULAR_TAGS_SLICE_COUNT } from '@/components/widgets/PopularTagsWidget/PopularTagsWidget.config';
import styles from '@/components/widgets/PopularTagsWidget/PopularTagsWidget.module.scss';

const PopularTagsWidget: FC = () => {
    const { data: baseData } = siteApi.useGetCommonDataQuery();

    return baseData?.popularTags?.length ? (
        <div className={styles.popularTagsWrapper}>
            {shuffle(baseData.popularTags)
                .slice(0, POPULAR_TAGS_SLICE_COUNT)
                .map((tagData) => (
                    <PopularTagModal
                        key={tagData.slug}
                        tagData={tagData}
                        className={styles.popularTagButton}
                    />
                ))}
        </div>
    ) : null;
};

export default PopularTagsWidget;
