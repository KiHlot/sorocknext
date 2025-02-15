'use client';

import { FC, useEffect, useState } from 'react';
import { CronInfoIF } from '@/api/site/types';
import adminStyles from '@/app/admin/admin.module.scss';
import Block from '@/components/blocks/Block/Block.component';
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
            <Block className={`flcol ${styles.blockWrapper}`}>
                <h1 className={adminStyles.pageTitle}>Настройки крона</h1>
                <CronInfo
                    modifyData={cronInfoData?.modifyData}
                    setCronInfoData={setCronInfoData}
                />
            </Block>

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
