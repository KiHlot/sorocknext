'use client';

import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { RxUpdate } from '~/react-icons/rx';
import { siteApi } from '@/api/site/site';
import { ModifyDataIF } from '@/api/site/types';
import { TIME_FORMAT } from '@/helpers/config';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import styles from '@/templates/CronTPL/CronInfo/CronInfo.module.scss';
import { CronInfoPropsIF } from '@/templates/CronTPL/CronInfo/CronInfo.types';

const CronInfo: FC<CronInfoPropsIF> = ({ modifyData }) => {
    const [updateCronInfo, { isLoading: isUpdateCronInfoLoading }] =
        siteApi.useLazyUpdateCronInfoQuery();

    const [currentData, setCurrentData] = useState<ModifyDataIF | null>(null);

    useEffect(() => {
        setCurrentData(modifyData || null);
    }, [modifyData]);

    const clickHandler = () => {
        updateCronInfo()
            .unwrap()
            .then(({ data }) => {
                setCurrentData(data?.modifyData || null);
            });
    };

    return (
        <div className={`flcol ${styles.cronInfoWrapper}`}>
            <div
                className={`${styles.cronInfoBlock} ${styles[currentData?.lastUpdateStatus || 'error']}`}
            >
                <div className={styles.label}>Последнее обновление:</div>
                <div className={styles.value}>
                    {currentData?.lastUpdate
                        ? dayjs(
                              currentData.lastUpdate,
                              TIME_FORMAT.common,
                          ).format(TIME_FORMAT.previewWithTime)
                        : 'no date'}
                </div>
                <div className={`${styles.value} `}>
                    {currentData?.lastUpdateStatus || 'error'}
                </div>
                <div className={styles.value}>
                    {currentData?.updatedBy || 'error'}
                </div>
                <MainButton
                    variant="default"
                    className={styles.updateCronInfoButton}
                    disabled={isUpdateCronInfoLoading}
                    clickHandler={clickHandler}
                >
                    <RxUpdate />
                </MainButton>
            </div>
        </div>
    );
};

export default CronInfo;
