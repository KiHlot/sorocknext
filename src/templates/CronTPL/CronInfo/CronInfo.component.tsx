import dayjs from 'dayjs';
import { FC } from 'react';
import { RxUpdate } from '~/react-icons/rx';
import { siteApi } from '@/api/site/site';
import { TIME_FORMAT } from '@/helpers/config';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import styles from '@/templates/CronTPL/CronInfo/CronInfo.module.scss';
import { CronInfoPropsIF } from '@/templates/CronTPL/CronInfo/CronInfo.types';

const CronInfo: FC<CronInfoPropsIF> = ({ modifyData, setCronInfoData }) => {
    const [updateCronInfo, { isLoading }] =
        siteApi.useLazyUpdateCronInfoQuery();

    const clickHandler = () => {
        updateCronInfo()
            .unwrap()
            .then(({ data }) => {
                setCronInfoData(data || null);
            });
    };

    return (
        <div className={`flcol ${styles.cronInfoWrapper}`}>
            <div
                className={`${styles.cronInfoBlock} ${styles[modifyData?.lastUpdateStatus || 'error']}`}
            >
                <div className={styles.label}>Последнее обновление:</div>
                <div className={styles.value}>
                    {modifyData?.lastUpdate
                        ? dayjs(
                              modifyData.lastUpdate,
                              TIME_FORMAT.common,
                          ).format(TIME_FORMAT.previewWithTime)
                        : 'no date'}
                </div>
                <div className={`${styles.value} `}>
                    {modifyData?.lastUpdateStatus || 'error'}
                </div>
                <div className={styles.value}>
                    {modifyData?.updatedBy || 'error'}
                </div>
                <MainButton
                    variant="default"
                    className={styles.updateCronInfoButton}
                    disabled={isLoading}
                    clickHandler={clickHandler}
                >
                    <RxUpdate />
                </MainButton>
            </div>
        </div>
    );
};

export default CronInfo;
