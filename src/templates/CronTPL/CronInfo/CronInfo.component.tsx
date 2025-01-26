'use client';

import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { RxUpdate } from '~/react-icons/rx';
import { siteApi } from '@/api/site/site';
import { CronInfoIF } from '@/api/site/types';
import { TIME_FORMAT } from '@/helpers/config';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import styles from '@/templates/CronTPL/CronInfo/CronInfo.module.scss';
import { CronInfoPropsIF } from '@/templates/CronTPL/CronInfo/CronInfo.types';

const CronInfo: FC<CronInfoPropsIF> = ({ data, className = '' }) => {
    const [updateCronInfo, { isLoading: isUpdateCronInfoLoading }] =
        siteApi.useLazyUpdateCronInfoQuery();

    const [currentData, setCurrentData] = useState<CronInfoIF | null>(null);

    useEffect(() => {
        setCurrentData(data);
    }, [data]);

    const clickHandler = () => {
        updateCronInfo()
            .unwrap()
            .then(({ data }) => {
                setCurrentData(data);
            });
    };

    return (
        <div className={`flcol ${styles.cronInfo}`}>
            <div className={styles.cronInfoBlock}>
                <div className={styles.label}>Последнее обновление:</div>
                <div className={styles.value}>
                    {dayjs(
                        currentData?.modifyData?.lastUpdate,
                        TIME_FORMAT.common,
                    ).format(TIME_FORMAT.previewWithTime)}
                </div>
                <div
                    className={`${styles.value} ${styles[currentData?.modifyData?.lastUpdateStatus || 'error']}`}
                >
                    {currentData?.modifyData?.lastUpdateStatus || 'error'}
                </div>
                <div className={styles.value}>
                    {currentData?.modifyData?.updatedBy}
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
