import { FC } from 'react';
import { siteApi } from '@/api/site/site';
import { shuffle } from '@/helpers/utils';
import styles from '@/components/blocks/PopularTags/PopularTags.module.scss';
import { DefaultProps } from '@/components/blocks/PopularTags/PopularTags.types';
import TagButton from '@/components/blocks/PopularTags/TagButton/TagButton.component';

const PopularTags: FC<DefaultProps> = ({ className = '' }) => {
    const [, { data: baseData }] = siteApi.useGetBaseDataMutation({
        fixedCacheKey: 'baseData',
    });

    return baseData?.popularTags?.length ? (
        <div className={`${styles.popularTagsWrapper} ${className || ''}`}>
            {shuffle(baseData.popularTags)
                .slice(0, 15)
                .map(item => (
                    <TagButton
                        key={item.slug}
                        data={item}
                        className={styles.tagButton}
                    />
                ))}
        </div>
    ) : null;
};

export default PopularTags;
