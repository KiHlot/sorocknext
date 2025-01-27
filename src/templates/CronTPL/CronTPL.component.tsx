'use client';

import { FC, useEffect, useState } from 'react';
import { CronInfoIF } from '@/api/site/types';
import NoData from '@/components/elems/NoData/NoData.component';
import CronInfo from '@/templates/CronTPL/CronInfo/CronInfo.component';
import styles from '@/templates/CronTPL/CronTPL.module.scss';
import { CronTPLPropsIF } from '@/templates/CronTPL/CronTPL.types';
import CronTable from '@/templates/CronTPL/CronTable/CronTable.component';

const CronTPL: FC<CronTPLPropsIF> = ({ data }) => {
    const [cronInfoData, setCronInfoData] = useState<CronInfoIF | null>(null);

    useEffect(() => {
        setCronInfoData(data || null);
    }, [data]);

    return (
        <div className={`flcol ${styles.cronTPLWrapper}`}>
            <div className={styles.pageTitle}>
                <h1>Настройки крона</h1>
            </div>
            <CronInfo modifyData={cronInfoData?.modifyData} setCronInfoData={setCronInfoData}/>
            {cronInfoData?.jsonStatuses ? (
                <CronTable jsonStatuses={cronInfoData.jsonStatuses} setCronInfoData={setCronInfoData}/>
            ) : (
                <NoData />
            )}
        </div>
    );
};

export default CronTPL;
