'use client';

import { FC, useState } from 'react';
import { IoPricetagOutline, IoCalendarOutline } from 'react-icons/io5';
import { taxonomyApi } from '@/api/taxonomy/taxonomy';
import Loading from '@/components/elems/Loading/Loading.component';
import Modal from '@/components/interactive/Modal/Modal.component';
import PopularTagThumb from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagThumb/PopularTagThumb.component';
import styles from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.module.scss';
import { PopularTagModalPropsIF } from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.types';

const PopularTagModal: FC<PopularTagModalPropsIF> = ({
    tagData,
    className,
}) => {
    const [searchPostsByTag, { data: response, isLoading }] =
        taxonomyApi.useSearchPostsByTagMutation();

    const { data } = response || {};

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
                        {sortedYears.map((year) => (
                            <div key={year} className={styles.yearWrapper}>
                                <div className={styles.yearTitle}>
                                    <IoCalendarOutline />
                                    <span className={styles.label}>{year}</span>
                                </div>

                                <div className={styles.yearList}>
                                    {data[year]?.map((thumbData) => (
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
                    <Loading />
                )}
            </Modal>
        </>
    );
};

export default PopularTagModal;
