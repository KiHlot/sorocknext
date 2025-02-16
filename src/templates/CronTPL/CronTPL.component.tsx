'use client';

import { FC, useEffect, useState } from 'react';
import { siteApi } from '@/api/site/site';
import { CronInfoIF } from '@/api/site/types';
import AdminPromoBlock from '@/components/blocks/AdminPromoBlock/AdminPromoBlock.component';
import NoData from '@/components/elems/NoData/NoData.component';
import styles from '@/templates/CronTPL/CronTPL.module.scss';
import { CronTPLPropsIF } from '@/templates/CronTPL/CronTPL.types';
import CronTable from '@/templates/CronTPL/CronTable/CronTable.component';

const CronTPL: FC<CronTPLPropsIF> = ({ data }) => {
    const [cronInfoData, setCronInfoData] = useState<CronInfoIF | null>(null);
    const [updateCronInfo, { isLoading }] =
        siteApi.useLazyUpdateCronInfoQuery();

    const clickHandler = () => {
        updateCronInfo()
            .unwrap()
            .then(({ data }) => {
                setCronInfoData(data || null);
            });
    };

    useEffect(() => {
        setCronInfoData(data || null);
    }, [data]);

    return (
        <div className={`flcol ${styles.cronTPLWrapper}`}>
            <AdminPromoBlock
                title="Настройки крона"
                clickHandler={clickHandler}
                modifyData={cronInfoData?.modifyData}
                isLoading={isLoading}
            />
            {cronInfoData?.jsonStatuses ? (
                <CronTable
                    jsonStatuses={cronInfoData.jsonStatuses}
                    setCronInfoData={setCronInfoData}
                />
            ) : (
                <NoData />
            )}
        </div>
    );
};

export default CronTPL;
