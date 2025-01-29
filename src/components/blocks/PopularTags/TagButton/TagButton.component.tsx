'use client';

import { FC, Fragment, useState } from 'react';
import { IoPricetagOutline } from 'react-icons/io5';
import { taxonomyApi } from '@/api/taxonomy/taxonomy';
import { TagSearchIF } from '@/api/taxonomy/types';
import GlobLoading from '@/components/blocks/GlobLoading/GlobLoading.component';
import styles from '@/components/blocks/PopularTags/TagButton/TagButton.module.scss';
import { TagButtonPropsIF } from '@/components/blocks/PopularTags/TagButton/TagButton.types';
import Modal from '@/components/main/Modal/Modal.component';

const TagButton: FC<TagButtonPropsIF> = ({ tagData, className = '' }) => {
    const [searchPostsByTag, { data, isLoading }] =
        taxonomyApi.useSearchPostsByTagMutation({
            fixedCacheKey: 'searchPostsByTag',
        });

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openHandler = () => {
        setIsModalOpen(true);
        searchPostsByTag(tagData.id);
    };

    console.log('data', data)
    
    return (
        <>
            <button
                onClick={openHandler}
                className={`flc ${styles.tagButtonWrapper} ${className}`}
                type="button"
                disabled={isLoading}
            >
                {tagData.name}
            </button>
            <Modal
                isOpen={isModalOpen}
                closeHandler={() => setIsModalOpen(false)}
                size="large"
                title={{
                    label: `Поиск по тегу: ${tagData.name}`,
                    icon: <IoPricetagOutline />,
                }}
            >
                {data?.data ? (
                    <>
                        {Object.keys(data.data)
                            .sort(function (a, b) {
                                return parseInt(b) - parseInt(a);
                            })
                            .map(year => (
                                <div key={year} className={styles.year_wrapper}>
                                    <div className={styles.year_title}>
                                        {/*<CalendarIcon />*/}
                                        <span className={styles.label}>
                                            {year}
                                        </span>
                                    </div>

                                    <div className={styles.year_list}>
                                        {data.data[year].map((item: TagSearchIF) => (
                                            <Fragment key={item.url}>
                                                asd
                                                {/*<TagPopupItem data={item} />*/}
                                            </Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </>
                ) : (
                    <GlobLoading />
                )}
            </Modal>
        </>
    );
};

export default TagButton;
