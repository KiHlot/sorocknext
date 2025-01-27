'use client';

import { FC } from 'react';
import styles from '@/components/blocks/PopularTags/TagButton/TagButton.module.scss';
import { TagButtonPropsIF } from '@/components/blocks/PopularTags/TagButton/TagButton.types';

const TagButton: FC<TagButtonPropsIF> = ({ data, className = '' }) => {
    return (
        <button
            // onClick={() =>
            //   dispatch(togglePopups<TagThumbIF>("TAG_POPUP", !isTagPopupOpened, data))
            // }
            className={`flc ${styles.tagButtonWrapper} ${className}`}
            type="button"
        >
            {data.name}
        </button>
    );
};

export default TagButton;
