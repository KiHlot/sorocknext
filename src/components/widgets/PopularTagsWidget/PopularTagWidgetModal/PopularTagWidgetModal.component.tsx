'use client';

import { FC } from 'react';
import { IoPricetagOutline, IoCalendarOutline } from 'react-icons/io5';
import Loading from '@/components/elems/Loading/Loading.component';
import ModalSheet from '@/components/interactive/ModalSheet/ModalSheet.component';
import PopularTagThumb from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagThumb/PopularTagThumb.component';
import styles from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.module.scss';
import { PopularTagModalPropsIF } from '@/components/widgets/PopularTagsWidget/PopularTagWidgetModal/PopularTagWidgetModal.types';

const PopularTagModal: FC<PopularTagModalPropsIF> = ({ tagData }) => (
    <ModalSheet
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
    </ModalSheet>
);

export default PopularTagModal;
