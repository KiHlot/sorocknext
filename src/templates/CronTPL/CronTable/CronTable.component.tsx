'use client';

import { FC } from 'react';
import dayjs from '~/dayjs';
import { RxUpdate } from '~/react-icons/rx';
import { siteApi } from '@/api/site/site';
import { TIME_FORMAT } from '@/helpers/config';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import Table, {
    RowItem,
    TableRow,
} from '@/components/main/Table/Table.component';
import { TABLE_TITLES } from '@/templates/CronTPL/CronTable/CronTable.config';
import styles from '@/templates/CronTPL/CronTable/CronTable.module.scss';
import { CronTablePropsIF } from '@/templates/CronTPL/CronTable/CronTable.types';

const CronTable: FC<CronTablePropsIF> = ({ jsonStatuses, setCronInfoData }) => {
    const [updateCronTask, { isLoading: updateCronTaskLoading }] =
        siteApi.useUpdateCronTaskMutation();
    const [getCronInfo, { isLoading: cronInfoLoading }] =
        siteApi.useLazyGetCronInfoQuery();

    const updateTask = (taskName: string) => {
        updateCronTask(taskName)
            .unwrap()
            .finally(() => {
                getCronInfo()
                    .unwrap()
                    .then(data => {
                        setCronInfoData(data?.data || null);
                    });
            });
    };

    return (
        <Table titles={TABLE_TITLES}>
            {Object.entries(jsonStatuses)?.map(([taskName, value]) => (
                <TableRow key={taskName}>
                    <RowItem>{value?.label || 'Нет названия'}</RowItem>
                    <RowItem>
                        {value?.lastUpdate
                            ? dayjs(
                                  value.lastUpdate,
                                  TIME_FORMAT.common,
                              ).format(TIME_FORMAT.previewWithTime)
                            : 'Нет даты'}
                    </RowItem>
                    <RowItem
                        className={styles[value?.lastUpdateStatus || 'error']}
                    >
                        {value?.lastUpdateStatus || 'Нет статуса'}
                    </RowItem>
                    <RowItem>{value?.updatedBy || 'Нет автора'}</RowItem>
                    <RowItem>{value?.itemsCount || '-'}</RowItem>
                    <RowItem>
                        <MainButton
                            variant="default"
                            clickHandler={() => updateTask(taskName)}
                            className={styles.updateButton}
                            disabled={updateCronTaskLoading || cronInfoLoading}
                        >
                            <RxUpdate />
                        </MainButton>
                    </RowItem>
                </TableRow>
            ))}
        </Table>
    );
};

export default CronTable;
