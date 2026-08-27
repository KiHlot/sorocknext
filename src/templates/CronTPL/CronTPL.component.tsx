'use client';

import { FC, useEffect, useState } from 'react';
import { adminApi } from '@/api/admin/admin';
import { CronInfoIF } from '@/api/admin/types';
import AdminPromoBlock from '@/components/blocks/AdminPromoBlock/AdminPromoBlock.component';
import NoData from '@/components/elems/NoData/NoData.component';
import { CronTPLPropsIF } from '@/templates/CronTPL/CronTPL.types';
import CronTable from '@/templates/CronTPL/CronTable/CronTable.component';

const CronTPL: FC<CronTPLPropsIF> = ({ data }) => {
    const [cronInfoData, setCronInfoData] = useState<CronInfoIF | null>(null);
    const [updateCronInfo, { isLoading }] =
        adminApi.useLazyUpdateCronInfoQuery();

    const clickHandler = (): void => {
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
        <div className="flcol gapLayout">
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
