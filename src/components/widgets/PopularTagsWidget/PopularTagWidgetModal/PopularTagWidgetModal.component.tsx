'use client';

import { FC } from 'react';
import { IoPricetagOutline, IoCalendarOutline } from 'react-icons/io5';
import NoData from '@/components/elems/NoData/NoData.component';
import PopularTagThumb from '@/components/elems/PopularTagThumb/PopularTagThumb.component';
import ModalSheet from '@/components/interactive/ModalSheet/ModalSheet.component';
import {
    MODAL_ID,
    MODAL_TITLE_ID,
} from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.config';
import styles from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.module.scss';
import { PopularTagModalPropsIF } from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.types';

const PopularTagModal: FC<PopularTagModalPropsIF> = ({
    modalLabel,
    data,
    onClose,
    isLoading,
    isError,
}) => {
    const sortedYears = data
        ? Object.keys(data).sort(
              (a, b) => Number.parseInt(b) - Number.parseInt(a),
          )
        : [];

    return (
        <ModalSheet
            onClose={onClose}
            size="large"
            dataTest="popular_tag_modal"
            isLoading={isLoading}
            classNameBody={styles.bodyWrapper}
        >
            <div
                id={MODAL_ID}
                className={`flcol gapLayout ${styles.modalContent}`}
                aria-labelledby={MODAL_TITLE_ID}
            >
                <div className={styles.labelWrapper}>
                    <IoPricetagOutline aria-hidden />
                    <h3 id={MODAL_TITLE_ID}>{modalLabel}</h3>
                </div>
                {!isError && sortedYears.length > 0 && data ? (
                    <div className={styles.dataList}>
                        {sortedYears.map((year) => (
                            <div key={year} className={styles.yearWrapper}>
                                <div className={styles.yearTitle}>
                                    <IoCalendarOutline aria-hidden />
                                    <span className={styles.label}>{year}</span>
                                </div>
                                <div className={styles.yearList}>
                                    {data[year]?.map((thumbData) => (
                                        <PopularTagThumb
                                            key={thumbData.url}
                                            thumbData={thumbData}
                                            className={styles.thumb}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoData className={styles.noData} />
                )}
            </div>
        </ModalSheet>
    );
};

export default PopularTagModal;
