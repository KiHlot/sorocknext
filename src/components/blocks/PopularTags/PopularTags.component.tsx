import { FC } from 'react';
import { siteApi } from '@/api/site/site';
import { shuffle } from '@/helpers/utils';
import PopularTagModal from '@/components/blocks/PopularTags/PopularTagModal/PopularTagModal.component';
import styles from '@/components/blocks/PopularTags/PopularTags.module.scss';

const PopularTags: FC = () => {
    const [, { data: baseData }] = siteApi.useGetBaseDataMutation({
        fixedCacheKey: 'baseData',
    });

    return baseData?.popularTags?.length ? (
        <div className={styles.popularTagsWrapper}>
            {shuffle(baseData.popularTags)
                .slice(0, 15)
                .map(tagData => (
                    <PopularTagModal
                        key={tagData.slug}
                        tagData={tagData}
                        className={styles.popularTagButton}
                    />
                ))}
        </div>
    ) : null;
};

export default PopularTags;
