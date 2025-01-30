'use client';

import { FC, useState } from 'react';
import { IoPricetagOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';
import { taxonomyApi } from '@/api/taxonomy/taxonomy';
import GlobLoading from '@/components/blocks/GlobLoading/GlobLoading.component';
import styles from '@/components/blocks/PopularTags/PopularTagModal/PopularTagModal.module.scss';
import { PopularTagModalPropsIF } from '@/components/blocks/PopularTags/PopularTagModal/PopularTagModal.types';
import PopularTagThumb from '@/components/blocks/PopularTags/PopularTagModal/PopularTagThumb/PopularTagThumb.component';
import Modal from '@/components/main/Modal/Modal.component';

const PopularTagModal: FC<PopularTagModalPropsIF> = ({
    tagData,
    className,
}) => {
    const [searchPostsByTag, { data: response, isLoading }] =
        taxonomyApi.useSearchPostsByTagMutation();

    const { data } = response || {};

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openHandler = () => {
        setIsModalOpen(true);
        searchPostsByTag(tagData.id);
    };

    const sortedYears = data
        ? Object.keys(data).sort((a, b) => parseInt(b) - parseInt(a))
        : [];

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
                {!isLoading && sortedYears && data ? (
                    <>
                        {sortedYears.map(year => (
                            <div key={year} className={styles.yearWrapper}>
                                <div className={styles.yearTitle}>
                                    <IoCalendarOutline />
                                    <span className={styles.label}>{year}</span>
                                </div>

                                <div className={styles.yearList}>
                                    {data[year].map(thumbData => (
                                        <PopularTagThumb
                                            key={thumbData.url}
                                            thumbData={thumbData}
                                        />
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

export default PopularTagModal;
