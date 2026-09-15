'use client';

import { FC } from 'react';
import { IoPricetagOutline, IoCalendarOutline } from 'react-icons/io5';
import NoData from '@/components/elems/NoData/NoData.component';
import PopularTagThumb from '@/components/elems/PopularTagThumb/PopularTagThumb.component';
import ModalSheet from '@/components/interactive/ModalSheet/ModalSheet.component';
import styles from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.module.scss';
import { PopularTagModalPropsIF } from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.types';

const PopularTagModal: FC<PopularTagModalPropsIF> = ({
    modalLabel,
    data,
    onClose,
    isLoading,
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
            classNameBody={`flcol gapLayout ${styles.bodyWrapper}`}
        >
            <div className={styles.labelWrapper}>
                <IoPricetagOutline />
                <h3>{modalLabel}</h3>
            </div>
            {sortedYears && data ? (
                <div className={styles.dataList}>
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
        </ModalSheet>
    );
};

export default PopularTagModal;
